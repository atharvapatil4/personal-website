import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex items-center justify-center py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex-shrink-0 w-[300px] md:w-[400px]">
          <Image
            src="/profile_pic.png"
            alt="Atharva Patil"
            className="frame"
            width={400}
            height={400}
            priority
            style={{ width: "100%", height: "auto" }}
          />
          <p className="fig-caption">
            <b>fig. 2</b> — the author, Paris
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
          <p className="text-lg leading-relaxed">
            I currently work on the engineering team at{" "}
            <a href="https://x.ai" rel="noopener noreferrer" target="_blank">
              x.ai
            </a>{" "}
            (formerly Cursor). My ongoing interests involve building and
            optimizing LLM inference and large-scale serving applications. In
            the past I have worked on distributed training infrastructure,
            vector search, and some product engineering.
          </p>

          <p className="text-lg leading-relaxed">
            In my free time I enjoy reading, listening to music, and watching
            movies.
          </p>
        </div>
      </div>
    </main>
  );
}
