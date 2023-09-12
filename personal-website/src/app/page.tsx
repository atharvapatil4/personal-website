import Image from "next/image";
import CurrentTime from "./components/time";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-28 bg-gradient-radial">
      <div className="">
        <h1 className="font-semibold text-center text-5xl italic">
          Atharva Patil
        </h1>
        <br></br>
        <Image
          src="/sf2.jpeg"
          alt="Vercel Logo"
          className="dark:invert"
          width={500}
          height={400}
          priority
        />
        <br></br>

        <div className="text-center">
          <CurrentTime />
          <br></br>
          <a>about</a> //
          <a> reader</a> //
          <a> blog</a> //
          <a> contact</a>
        </div>
      </div>
    </main>
  );
}
