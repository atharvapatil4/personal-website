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
        </div>

        <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
          <p className="text-lg leading-relaxed">
            My name is Atharva Patil and I currently work on the Machine Learning
            Platform team at DoorDash in New York City. My current interests are
            in LLM inference, training infrastructure, big data systems, and
            large-scale (microservice) applications.
          </p>

          <p className="text-lg leading-relaxed">
            In my free time I enjoy reading, listening to music, and watching&nbsp;
            <a
              href="https://letterboxd.com/atharvapatil/"
              rel="noopener noreferrer"
              target="_blank"
            >
              movies
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
