import React from "react";
import Link from "next/link";

export default function Reader() {
  return (
    <main className="flex min-h-screen p-4 bg-gradient-radial">
      <div className="flex flex-col">
        <h1 className="font-semibold">Papers</h1>
        <ul className="text-xs list-disc pl-4">
          <li>
            <Link
              href="https://arxiv.org/pdf/1603.09320.pdf"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [07/10/23] Efficient and robust approximate nearest neighbor
              search using Hierarchical Navigable Small World graphs
            </Link>
          </li>
          <li>
            <Link
              href="https://bitcoin.org/bitcoin.pdf"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [07/01/23] Bitcoin Whitepaper
            </Link>
          </li>
          <li>
            <Link
              href="https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [06/23/23] MapReduce: Simplified Data Processing on Large Clusters
            </Link>
          </li>
        </ul>
        <h1 className="font-semibold">Engineering</h1>
        <ul className="text-xs list-disc pl-4">
          <li>
            <Link
              href="https://discord.com/blog/how-discord-stores-trillions-of-messages#:~:text=We%20stored%20our%20messages%20in,nodes%20with%20trillions%20of%20messages"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [09/08/23] How Discord Stores Trillions of Messages
            </Link>
          </li>
          <li>
            <Link
              href="https://blog.cloudflare.com/scalable-machine-learning-at-cloudflare/"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [09/01/23] Scalable Machine Learning at Cloudflare
            </Link>
          </li>
          <li>
            <Link
              href="https://scale.com/blog/reduce-cold-start-time-llm-inference?utm_source=linkedin&utm_medium=organic-social&utm_campaign=blog"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [08/29/23] Reducing Cold Start time for LLM Inference
            </Link>
          </li>
        </ul>
        <h1 className="font-semibold">Domestic</h1>
        <ul className="text-xs list-disc pl-4">
          <li>
            <Link
              href="https://www.wsj.com/lifestyle/careers/youve-heard-of-quiet-quitting-now-companies-are-quiet-cutting-ba2c326d?st=e2rccbdrtgnu7lx&reflink=desktopwebshare_permalink"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [08/27/23] Quiet Cutting
            </Link>
          </li>
        </ul>
        <h1 className="font-semibold">Foreign Affairs</h1>
        <ul className="text-xs list-disc pl-4">
          <li>
            <Link
              href="https://www.foreignaffairs.com/china/xi-jinping-age-stagnation"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [08/29/23] Xi's Age of Stagnation
            </Link>
          </li>
          <li>
            <Link
              href="https://www.wsj.com/world/europe/germany-is-losing-its-mojo-finding-it-again-wont-be-easy-c4b46761?st=4t0qrt9w9efawwb&reflink=desktopwebshare_permalink"
              className=" hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              [08/29/23] Germany is Losing its Mojo
            </Link>
          </li>
        </ul>
        <br></br>
        <h1 className="font-semibold">
          {" "}
          <Link href="/" className=" text-blue-500 hover:underline italic">
            Back to Home
          </Link>
        </h1>
      </div>
    </main>
  );
}
