import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-28 bg-gradient-radial">
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
            My name is Atharva Patil and I currently work on the Core
            Infrastructure team at Hive AI in San Francisco. My current
            interests are in vector search, data-related systems (databases and
            big data infrastructure) and large-scale (microservice)
            applications.
          </h1>
          <br />
          <h1>
            In my free time, I like to read{" "}
            <a className="text-blue-500 hover:underline" href="/reader">
              articles
            </a>
            {" + "}
            <a
              className="text-blue-500 hover:underline"
              href="https://www.goodreads.com/user/show/127860151-atharva-patil"
              rel="noopener noreferrer"
              target="_blank"
            >
              books
            </a>
            , listen to{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://open.spotify.com/user/22wtxfaxf5obyqlpeo4upxcey"
              rel="noopener noreferrer"
              target="_blank"
            >
              music
            </a>
            , and watch{" "}
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
