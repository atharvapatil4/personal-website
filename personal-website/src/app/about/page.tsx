import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-28 bg-gradient-radial">
      <div className="flex flex-col md:flex-row items-center">
        <div className="overflow-hidden">
          <Image
            src="/profile_pic.png"
            alt="Atharva Patil"
            className="rounded-md dark:invert"
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="text-center">
          <h1>
            My name is Atharva Patil and I currently work on the Core
            Infrastructure team at Hive AI in San Francisco. My current
            interests are in vector search, data-related systems (databases and
            big data infrastructure) and large-scale (microservice)
            applications.
          </h1>
          <br />
          <h1>
            In my free time, I like to read{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://www.goodreads.com/user/show/127860151-atharva-patil"
            >
              articles
            </a>
            ,{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://www.goodreads.com/user/show/127860151-atharva-patil"
            >
              books
            </a>
            , and watch{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://letterboxd.com/atharvapatil/"
            >
              movies
            </a>
            .
          </h1>
          <div id="my-button" className="text-center mt-4">
            <a
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
