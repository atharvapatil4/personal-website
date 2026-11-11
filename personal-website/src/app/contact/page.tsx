import Link from "next/link";
import dynamic from "next/dynamic";

const AsciiCube = dynamic(() => import("../components/AsciiCube"), {
  ssr: false,
});

export default function Contact() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <div className="frame w-full h-[300px] overflow-hidden mx-auto mb-8">
          <AsciiCube />
        </div>
        <p>Feel free to contact me for any opportunities or questions.</p>
        <p className="mt-6">e-mail</p>
        <p className="italic">atharvapatil2000 [at] gmail.com</p>
        <div className="mt-6">
          <Link
            href="https://www.linkedin.com/in/atharva0patil"
            rel="noopener noreferrer"
            target="_blank"
          >
            linkedIn
          </Link>
          <span aria-hidden="true">{" // "}</span>
          <Link
            href="https://github.com/atharvapatil4"
            rel="noopener noreferrer"
            target="_blank"
          >
            github
          </Link>
        </div>
      </div>
    </main>
  );
}
