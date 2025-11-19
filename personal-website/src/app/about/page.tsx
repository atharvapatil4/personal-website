import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-28 px-2 bg-gradient-radial">
      <div className="flex flex-col md:flex-row items-center">
        <div className="overflow-hidden">
          <Image
            src="/profile_pic.png"
            alt="Atharva Patil"
            className="rounded-md"
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="text-center">
          <br></br>
          <h1>
            My name is Atharva Patil and I currently work on the Machine Learning Platform
            team at DoorDash in New York City. My current
            interests are in LLM inference, training infrastructure,
            big data systems, and large-scale (microservice)
            applications.
          </h1>
          <br />
          <h1>
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
          <br></br>
          <h1 className="font-semibold">
            {" "}
            <Link href="/" className=" text-blue-500 hover:underline italic">
              Back to Home
            </Link>
          </h1>
          {/* <div id="my-button" className="text-center mt-4">
            <a
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 italic"
            >
              Back to Home
            </a>
          </div> */}
        </div>
      </div>
    </main>
  );
}
