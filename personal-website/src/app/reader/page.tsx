import React from "react";
import Link from "next/link";

export default function Reader() {
  return (
    <main className="flex min-h-screen p-4 bg-gradient-radial">
      <div className="flex flex-col">
        <h1 className="font-semibold">Papers</h1>
        <ul className="text-xs list-disc pl-4">
          <li>
            <Link href="/about" className=" hover:underline">
              [8/29/20] Bitcoin Whitepaper
            </Link>
          </li>
        </ul>
        <h1 className="font-semibold">Engineering</h1>
        <h1 className="font-semibold">Domestic</h1>
        <h1 className="font-semibold">Foreign Affairs</h1>
        <br></br>
        <h1 className="font-semibold">
          {" "}
          <Link href="/" className=" text-blue-500 hover:underline">
            Back to Home
          </Link>
        </h1>
      </div>
    </main>
  );
}
