import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-[500px] w-full">
        <Image
          src="/sf2.jpeg"
          alt="sf"
          className="frame w-full h-auto"
          width={500}
          height={400}
          priority
        />
        <p className="fig-caption">
          <b>fig. 1</b> — Polk St, Russian Hill, San Francisco
        </p>
      </div>
    </main>
  );
}
