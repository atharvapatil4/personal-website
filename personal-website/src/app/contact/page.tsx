import Link from "next/link";

export default function Reader() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-28 bg-gradient-radial">
      <div className="text-center">
        <br></br>
        <p>Feel free to contact me for any opportunities or questions.</p>
        <br></br>
        <p>e-mail</p>
        <p className="italic">atharvapatil2000@gmail.com</p>
        <br></br>
        <div className="flex justify-center">
          <div className="mr-8">
            <Link
              href="https://www.linkedin.com/in/atharva0patil"
              rel="noopener noreferrer"
              target="_blank"
              className=" text-blue-500 hover:underline"
            >
              linkedIn
            </Link>
          </div>
          <Link
            href="https://github.com/atharvapatil4"
            rel="noopener noreferrer"
            target="_blank"
            className=" text-blue-500 hover:underline"
          >
            github
          </Link>
        </div>
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
    </main>
  );
}
