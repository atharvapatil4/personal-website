"use client";

import React, { useRef, useEffect } from "react";

// ---- Shader sources ----

const SCENE_VS = `#version 300 es
in vec3 position;
in vec3 normal;
uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat3 uNormalMatrix;
out vec3 vNormal;
void main() {
  vNormal = normalize(uNormalMatrix * normal);
  gl_Position = uProjection * uModelView * vec4(position, 1.0);
}`;

const SCENE_FS = `#version 300 es
precision mediump float;
in vec3 vNormal;
out vec4 fragColor;
void main() {
  vec3 lightDir = normalize(vec3(-1.0, 1.0, 1.0));
  float light = max(0.1, dot(vNormal, lightDir)) * 0.7 + 0.2;
  // Invert: bright surfaces become dark in texture so ASCII shader
  // produces dense characters, which then render as dark on light bg
  fragColor = vec4(light, light, light, 1.0);
}`;

const POST_VS = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const POST_FS = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform sampler2D uTexture;
out vec4 fragColor;

float character(int n, vec2 p) {
  float scale = uResolution.x < 768.0 ? 5.0 : 6.0;
  p = floor(p * vec2(-scale, scale) + 2.5);
  if (clamp(p.x, 0.0, 6.0) == p.x && clamp(p.y, 0.0, 6.0) == p.y) {
    int a = int(round(p.x) + 5.0 * round(p.y));
    if (((n >> a) & 1) == 1) return 0.8;
  }
  return 0.0;
}

void main() {
  vec2 pix = gl_FragCoord.xy;
  float pixelSize = uResolution.x < 768.0 ? 10.0 : 14.0;
  vec3 col = texture(uTexture, floor(pix / pixelSize) * pixelSize / uResolution.xy).rgb;
  float gray = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;

  int n = 2048;
  if (gray > 0.2) n = 65600;
  if (gray > 0.3) n = 163153;
  if (gray > 0.4) n = 15255086;
  if (gray > 0.5) n = 13121101;
  if (gray > 0.6) n = 15252014;
  if (gray > 0.7) n = 13195790;
  if (gray > 0.8) n = 11512810;

  float charSize = 4.0;
  vec2 p = mod(pix / charSize, 2.0) - vec2(1.0);
  float c = character(n, p);

  vec3 charColor = vec3(0.0);
  if (gray < 0.2) {
    charColor = vec3(0.7);
  }
  fragColor = vec4(charColor, c);
}`;

// ---- Math helpers ----

function createPerspective(fov: number, aspect: number, near: number, far: number): Float32Array {
  const f = 1.0 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function mat4Multiply(a: Float32Array, b: Float32Array): Float32Array {
  const out = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[j * 4 + i] =
        a[i] * b[j * 4] + a[4 + i] * b[j * 4 + 1] +
        a[8 + i] * b[j * 4 + 2] + a[12 + i] * b[j * 4 + 3];
    }
  }
  return out;
}

function mat4RotateX(m: Float32Array, angle: number): Float32Array {
  const c = Math.cos(angle), s = Math.sin(angle);
  const r = new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  return mat4Multiply(m, r);
}

function mat4RotateY(m: Float32Array, angle: number): Float32Array {
  const c = Math.cos(angle), s = Math.sin(angle);
  const r = new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  return mat4Multiply(m, r);
}

function mat4RotateZ(m: Float32Array, angle: number): Float32Array {
  const c = Math.cos(angle), s = Math.sin(angle);
  const r = new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  return mat4Multiply(m, r);
}

function mat4Translate(m: Float32Array, x: number, y: number, z: number): Float32Array {
  const t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
  return mat4Multiply(m, t);
}

function mat4Identity(): Float32Array {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function normalMatrixFromMV(mv: Float32Array): Float32Array {
  const a = mv;
  const a00 = a[0], a01 = a[1], a02 = a[2];
  const a10 = a[4], a11 = a[5], a12 = a[6];
  const a20 = a[8], a21 = a[9], a22 = a[10];
  const det = a00 * (a11 * a22 - a12 * a21) - a01 * (a10 * a22 - a12 * a20) + a02 * (a10 * a21 - a11 * a20);
  const id = 1.0 / det;
  return new Float32Array([
    (a11 * a22 - a12 * a21) * id,
    (a02 * a21 - a01 * a22) * id,
    (a01 * a12 - a02 * a11) * id,
    (a12 * a20 - a10 * a22) * id,
    (a00 * a22 - a02 * a20) * id,
    (a02 * a10 - a00 * a12) * id,
    (a10 * a21 - a11 * a20) * id,
    (a01 * a20 - a00 * a21) * id,
    (a00 * a11 - a01 * a10) * id,
  ]);
}

// ---- Cube geometry ----

function createCubeBuffers(gl: WebGL2RenderingContext) {
  const positions = new Float32Array([
    // Front
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
    // Back
    -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1,
    // Top
    -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
    // Bottom
    -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
    // Right
    1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
    // Left
    -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1,
  ]);

  const normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23,
  ]);

  const posBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const normBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, normBuf);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

  const idxBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return { posBuf, normBuf, idxBuf, count: indices.length };
}

// ---- Shader compilation ----

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}

function createProgram(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
  }
  return p;
}

// ---- Fullscreen quad ----

function createQuad(gl: WebGL2RenderingContext) {
  const pos = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);
  const uv = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
  const idx = new Uint16Array([0, 1, 2, 0, 2, 3]);

  const posBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

  const uvBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
  gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);

  const idxBuf = gl.createBuffer()!;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

  return { posBuf, uvBuf, idxBuf };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function AsciiCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Scene program (renders cube to FBO)
    const sceneProg = createProgram(gl, SCENE_VS, SCENE_FS);
    const sPos = gl.getAttribLocation(sceneProg, "position");
    const sNorm = gl.getAttribLocation(sceneProg, "normal");
    const sModelView = gl.getUniformLocation(sceneProg, "uModelView");
    const sProjection = gl.getUniformLocation(sceneProg, "uProjection");
    const sNormalMat = gl.getUniformLocation(sceneProg, "uNormalMatrix");

    // Post-processing program (ASCII shader)
    const postProg = createProgram(gl, POST_VS, POST_FS);
    const pPos = gl.getAttribLocation(postProg, "position");
    const pUv = gl.getAttribLocation(postProg, "uv");
    const pResolution = gl.getUniformLocation(postProg, "uResolution");
    const pTexture = gl.getUniformLocation(postProg, "uTexture");

    // Geometry
    const cube = createCubeBuffers(gl);
    const quad = createQuad(gl);

    // Framebuffer for offscreen render
    let fboWidth = 0, fboHeight = 0;
    let fbo = gl.createFramebuffer()!;
    let fboTexture = gl.createTexture()!;
    let fboDepth = gl.createRenderbuffer()!;

    function resizeFBO(w: number, h: number) {
      if (w === fboWidth && h === fboHeight) return;
      fboWidth = w;
      fboHeight = h;

      gl!.bindTexture(gl!.TEXTURE_2D, fboTexture);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, w, h, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);

      gl!.bindRenderbuffer(gl!.RENDERBUFFER, fboDepth);
      gl!.renderbufferStorage(gl!.RENDERBUFFER, gl!.DEPTH_COMPONENT16, w, h);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, fboTexture, 0);
      gl!.framebufferRenderbuffer(gl!.FRAMEBUFFER, gl!.DEPTH_ATTACHMENT, gl!.RENDERBUFFER, fboDepth);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    let animId: number;
    const startTime = performance.now();

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      canvas.width = w;
      canvas.height = h;

      resizeFBO(w, h);

      // Smooth mouse
      smoothRef.current.x = lerp(smoothRef.current.x, mouseRef.current.x, 0.05);
      smoothRef.current.y = lerp(smoothRef.current.y, mouseRef.current.y, 0.05);

      const time = (performance.now() - startTime) / 1000;
      const rotY = time * 0.4 + smoothRef.current.x * 0.4;
      const rotX = smoothRef.current.y * 0.4;
      const tiltZ = Math.PI / 4;

      // Build model-view matrix
      let mv = mat4Identity();
      mv = mat4Translate(mv, 0, 0, -5);
      mv = mat4RotateZ(mv, tiltZ);
      mv = mat4RotateX(mv, rotX);
      mv = mat4RotateY(mv, rotY);

      const proj = createPerspective(Math.PI / 4, w / h, 0.1, 100);
      const normalMat = normalMatrixFromMV(mv);

      // ---- Pass 1: Render cube to FBO ----
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);

      gl.useProgram(sceneProg);
      gl.uniformMatrix4fv(sModelView, false, mv);
      gl.uniformMatrix4fv(sProjection, false, proj);
      gl.uniformMatrix3fv(sNormalMat, false, normalMat);

      gl.bindBuffer(gl.ARRAY_BUFFER, cube.posBuf);
      gl.enableVertexAttribArray(sPos);
      gl.vertexAttribPointer(sPos, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, cube.normBuf);
      gl.enableVertexAttribArray(sNorm);
      gl.vertexAttribPointer(sNorm, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube.idxBuf);
      gl.drawElements(gl.TRIANGLES, cube.count, gl.UNSIGNED_SHORT, 0);

      // ---- Pass 2: ASCII post-processing to screen ----
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);

      gl.useProgram(postProg);
      gl.uniform2f(pResolution, w, h);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboTexture);
      gl.uniform1i(pTexture, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, quad.posBuf);
      gl.enableVertexAttribArray(pPos);
      gl.vertexAttribPointer(pPos, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, quad.uvBuf);
      gl.enableVertexAttribArray(pUv);
      gl.vertexAttribPointer(pUv, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quad.idxBuf);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.BLEND);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      gl.deleteFramebuffer(fbo);
      gl.deleteTexture(fboTexture);
      gl.deleteRenderbuffer(fboDepth);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
