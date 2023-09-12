/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import CurrentTime from "./components/time";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-radial">
      <div className="">
        <h1 className="font-semibold text-center text-5xl italic">
          ATHARVA PATIL
        </h1>
        <br></br>
        <Image
          src="/sf2.jpeg"
          alt="sf"
          className="rounded-md"
          width={500}
          height={400}
          priority
        />
        <br></br>

        <div className="text-center">
          <CurrentTime />
          <br></br>
          <br></br>
          <Link href="/about" className=" text-blue-500 hover:underline">
            about
          </Link>
          {" // "}
          <Link href="/reader" className="text-blue-500 hover:underline">
            reader
          </Link>
          {" // "}
          <a> blog</a>
          {" // "}
          <Link href="/contact" className="text-blue-500 hover:underline">
            contact
          </Link>
        </div>
      </div>
    </main>
  );
}
