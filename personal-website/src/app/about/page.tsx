import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-radial">
      <div className="flex items-center gap-12 max-w-6xl mx-auto px-8">
        <div className="flex-shrink-0">
          <Image
            src="/profile_pic.png"
            alt="Atharva Patil"
            className="rounded-md"
            width={400}
            height={400}
            priority
          />
        </div>

        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-lg leading-relaxed">
            My name is Atharva Patil and I currently work on the Machine Learning Platform
            team at DoorDash in New York City. My current
            interests are in LLM inference, training infrastructure,
            big data systems, and large-scale (microservice)
            applications.
          </h1>
          
          <h1 className="text-lg leading-relaxed">
            In my free time I enjoy reading, listening to music, and watching&nbsp;
            <a
              className="text-blue-500 hover:underline"
              href="https://letterboxd.com/atharvapatil/"
              rel="noopener noreferrer"
              target="_blank"
            >
               movies
            </a>
            .
          </h1>
          
          <h1 className="font-semibold mt-4 text-center">
            <Link href="/" className="text-blue-500 hover:underline italic">
              Back to Home
            </Link>
          </h1>
        </div>
      </div>
    </main>
  );
}
