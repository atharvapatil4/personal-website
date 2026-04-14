import Link from "next/link";
import dynamic from "next/dynamic";

const AsciiCube = dynamic(() => import("../components/AsciiCube"), {
  ssr: false,
});

export default function Reader() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-28 bg-gradient-radial">
      <div className="text-center">
        <div className="w-[400px] h-[300px] max-w-full rounded-md overflow-hidden mx-auto mb-8">
          <AsciiCube />
        </div>
        <p>Feel free to contact me for any opportunities or questions.</p>
        <br></br>
        <p>e-mail</p>
        <p className="italic">atharvapatil2000 [at] gmail.com</p>
        <br></br>
        <div className="flex justify-center">
          <div className="mr-8">
            <Link
              href="https://www.linkedin.com/in/atharva0patil"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              linkedIn
            </Link>
          </div>
          <Link
            href="https://github.com/atharvapatil4"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            github
          </Link>
        </div>
        <br></br>
        <h1 className="font-semibold">
          {" "}
          <Link href="/" className="text-blue-500 hover:underline italic">
            Back to Home
          </Link>
        </h1>
      </div>
    </main>
  );
}
