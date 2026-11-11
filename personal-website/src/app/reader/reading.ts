export type ReadingItem = { date: string; title: string; href: string };

export type ReadingSection = {
  key: string;
  label: string;
  items: ReadingItem[];
};

export const READING: ReadingSection[] = [
  {
    key: "papers",
    label: "Papers",
    items: [
      {
        date: "11/19/25",
        title: "PyTorch: An Imperative Style, High-Performance Deep Learning Library",
        href: "https://arxiv.org/pdf/1912.01703",
      },
      {
        date: "08/16/25",
        title: "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving",
        href: "https://hao-ai-lab.github.io/blogs/distserve/",
      },
      {
        date: "07/23/25",
        title: "Inference without Interference: Disaggregate LLM Inference for Mixed Downstream Workloads",
        href: "https://arxiv.org/html/2401.11181v1",
      },
      {
        date: "07/10/23",
        title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs",
        href: "https://arxiv.org/pdf/1603.09320.pdf",
      },
      {
        date: "07/01/23",
        title: "Bitcoin Whitepaper",
        href: "https://bitcoin.org/bitcoin.pdf",
      },
      {
        date: "06/23/23",
        title: "MapReduce: Simplified Data Processing on Large Clusters",
        href: "https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf",
      },
    ],
  },
  {
    key: "engineering",
    label: "Engineering",
    items: [
      {
        date: "07/03/26",
        title: "On-Policy Distillation",
        href: "https://thinkingmachines.ai/blog/on-policy-distillation/",
      },
      {
        date: "02/14/26",
        title: "A guide to PyTorch's CUDA Caching Allocator",
        href: "https://zdevito.github.io/2022/08/04/cuda-caching-allocator.html",
      },
      {
        date: "11/20/25",
        title: "FineWeb: decanting the web for the finest text data at scale",
        href: "https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1",
      },
      {
        date: "11/18/25",
        title: "Post Training Ensemble vs. Singular Model Approaches with Tinker",
        href: "https://xcancel.com/i/article/1985442169445105753",
      },
      {
        date: "09/12/25",
        title: "Improving Cursor Tab with online RL",
        href: "https://cursor.com/blog/tab-rl",
      },
      {
        date: "09/11/25",
        title: "Claude Memory: A Different Philosophy",
        href: "https://www.shloked.com/writing/claude-memory",
      },
      {
        date: "09/06/25",
        title: "How io_uring and eBPF Will Revolutionize Programming in Linux",
        href: "https://www.scylladb.com/2020/05/05/how-io_uring-and-ebpf-will-revolutionize-programming-in-linux/",
      },
      {
        date: "06/13/25",
        title: "Actor Model in Rust with Tokio",
        href: "https://ryhl.io/blog/actors-with-tokio/",
      },
      {
        date: "06/05/25",
        title: "LLMs & Elixir: Windfall or Deathblow?",
        href: "https://www.zachdaniel.dev/p/llms-and-elixir-windfall-or-deathblow",
      },
      {
        date: "08/16/24",
        title: "Dealing with rejection (in distributed systems)",
        href: "https://www.warpstream.com/blog/dealing-with-rejection-in-distributed-systems",
      },
      {
        date: "03/05/24",
        title: "Doing Microservices Completely Wrong: Distributed Monoliths",
        href: "https://medium.com/@dmosyan/doing-microservices-completely-wrong-distributed-monoliths-cede5c44d8a7",
      },
      {
        date: "09/22/23",
        title: "How Cloudflare built rate limiting capable of scaling to millions of domains",
        href: "https://blog.cloudflare.com/counting-things-a-lot-of-different-things/#fn4",
      },
      {
        date: "09/22/23",
        title: "Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%",
        href: "https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90",
      },
      {
        date: "09/21/23",
        title: "Scaling the GitHub API with a sharded, replicated rate limiter in Redis",
        href: "https://github.blog/2021-04-05-how-we-scaled-github-api-sharded-replicated-rate-limiter-redis/",
      },
      {
        date: "09/13/23",
        title: "Why Nvidia's AI Supremacy is Only Temporary",
        href: "https://petewarden.com/2023/09/10/why-nvidias-ai-supremacy-is-only-temporary/",
      },
      {
        date: "09/08/23",
        title: "How Discord Stores Trillions of Messages",
        href: "https://discord.com/blog/how-discord-stores-trillions-of-messages#:~:text=We%20stored%20our%20messages%20in,nodes%20with%20trillions%20of%20messages",
      },
      {
        date: "09/01/23",
        title: "Scalable Machine Learning at Cloudflare",
        href: "https://blog.cloudflare.com/scalable-machine-learning-at-cloudflare/",
      },
      {
        date: "08/29/23",
        title: "Reducing Cold Start time for LLM Inference at Scale.ai",
        href: "https://scale.com/blog/reduce-cold-start-time-llm-inference?utm_source=linkedin&utm_medium=organic-social&utm_campaign=blog",
      },
    ],
  },
  {
    key: "lectures",
    label: "Lectures",
    items: [
      {
        date: "03/01/26",
        title: "Building Machine Learning Systems for a Trillion Trillion Floating Point Operations",
        href: "https://www.youtube.com/watch?v=139UPjoq7Kw",
      },
      {
        date: "02/27/26",
        title: "Stop Writing Dead Programs",
        href: "https://www.youtube.com/watch?v=8Ab3ArE8W3s",
      },
      {
        date: "02/14/26",
        title: "Monarch: A Distributed Execution Engine for PyTorch",
        href: "https://www.youtube.com/watch?v=rX1ar5lcZy4",
      },
      {
        date: "11/14/25",
        title: "Making GPUs Actually Fast: A Deep Dive into Training Performance",
        href: "https://www.youtube.com/watch?v=pHqcHzxx6I8",
      },
      {
        date: "07/23/25",
        title: "Accelerating LLM Inference with vLLM (and SGLang)",
        href: "https://www.youtube.com/watch?v=PcvxdWJOyUE",
      },
      {
        date: "07/23/25",
        title: "Fast LLM Serving with vLLM and PagedAttention",
        href: "https://www.youtube.com/watch?v=5ZlavKF_98U",
      },
      {
        date: "08/03/24",
        title: "How We've Scaled Dropbox",
        href: "https://www.youtube.com/watch?v=PE4gwstWhmc",
      },
      {
        date: "08/01/24",
        title: "The tragedy of systemd",
        href: "https://www.youtube.com/watch?v=o_AIw9bGogo",
      },
      {
        date: "10/11/23",
        title: "Noam Chomsky on Modern-Day American Imperalism: Middle East and Beyond",
        href: "https://www.youtube.com/watch?v=7PdJ9TAdTdA&t=4894s",
      },
      {
        date: "10/11/23",
        title: "Noam Chomsky on Power and Ideology",
        href: "https://www.youtube.com/watch?v=w_X5czMVKT8",
      },
      {
        date: "10/09/23",
        title: "Yale ENGL 291: Thomas Pynchon, The Crying of Lot 49",
        href: "https://www.youtube.com/watch?v=3dtqt0bXb4Y",
      },
    ],
  },
  {
    key: "domestic",
    label: "Domestic",
    items: [
      {
        date: "06/10/24",
        title: "New York's Governor Is Inept",
        href: "https://www.theatlantic.com/ideas/archive/2024/06/hochul-new-york-congestion-pricing/678621/",
      },
      {
        date: "03/05/24",
        title: "Global Liquidity Is Ready To Push Assets Higher",
        href: "https://pomp.substack.com/p/global-liquidity-is-ready-to-push",
      },
      {
        date: "01/26/24",
        title: "Cooler Inflation Keeps Door Open for Rate Cuts This Year",
        href: "https://www.wsj.com/economy/central-banking/what-to-watch-in-fridays-spending-report-a-last-look-at-inflation-before-the-fed-meeting-353665d9?st=0mv2hx1nruvdxvv&reflink=desktopwebshare_permalink",
      },
      {
        date: "01/22/24",
        title: "Companies rush to bond market in record $150bn debt splurge",
        href: "https://archive.is/20240121115013/https://www.ft.com/content/20041cec-a83f-4f41-8cf3-b40d3464c922#selection-1529.0-1529.59",
      },
      {
        date: "01/21/24",
        title: "This Isn't Your Father's S&P 500. Don't Worry About Valuations.",
        href: "https://www.bloomberg.com/opinion/articles/2024-01-19/s-p-500-don-t-let-valuations-new-record-worry-you",
      },
      {
        date: "10/09/23",
        title: "Americans Are Still Spending Like There's No Tomorrow",
        href: "https://www.wsj.com/economy/consumers/americans-are-still-spending-like-theres-no-tomorrow-6a1d307?st=86bpxhxvf7bfcv2&reflink=desktopwebshare_permalink",
      },
      {
        date: "10/09/23",
        title: "The Free-Money Experiment Is Over",
        href: "https://archive.ph/t6Yt5",
      },
      {
        date: "10/09/23",
        title: "Corporate America Is Ignoring Jay Powell and Bingeing on Debt",
        href: "https://archive.ph/VwKtn",
      },
      {
        date: "10/09/23",
        title: "The 5% Bond Market Means Pain Is Heading Everyone's Way",
        href: "https://archive.ph/c7YEO",
      },
      {
        date: "09/26/23",
        title: "The Hedge Fund That Made a Killing Betting Against Lina Khan",
        href: "https://www.wsj.com/us-news/law/the-hedge-fund-that-made-a-killing-betting-against-lina-khan-d5b395b1",
      },
      {
        date: "08/27/23",
        title: "Quiet Cutting",
        href: "https://www.wsj.com/lifestyle/careers/youve-heard-of-quiet-quitting-now-companies-are-quiet-cutting-ba2c326d?st=e2rccbdrtgnu7lx&reflink=desktopwebshare_permalink",
      },
    ],
  },
  {
    key: "global",
    label: "Global",
    items: [
      {
        date: "06/10/24",
        title: "How the Talmud Became a Best-Seller in South Korea",
        href: "https://www.newyorker.com/books/page-turner/how-the-talmud-became-a-best-seller-in-south-korea#:~:text=The%20students%20are%20not%20Jewish,addition%20to%20a%20Korean%20one",
      },
      {
        date: "10/19/23",
        title: "A Financial Crisis in China Is No Longer Unthinkable",
        href: "https://www.wsj.com/world/china/dont-rule-out-a-financial-crisis-in-china-ed048ef9?st=2oe5pa8rf3pqx5l&reflink=desktopwebshare_permalink",
      },
      {
        date: "10/19/23",
        title: "China's loans pushing world's poorest countries to brink of collapse",
        href: "https://apnews.com/article/china-debt-banking-loans-financial-developing-countries-collapse-8df6f9fac3e1e758d0e6d8d5dfbd3ed6",
      },
      {
        date: "10/12/23",
        title: "Lessons from the 1970s Energy Crisis Can Help Prevent the Next One",
        href: "https://www.wsj.com/economy/global/lessons-from-the-1970s-energy-crisis-can-help-prevent-the-next-one-59a13d30?st=y1twy1xrzgmmwhg&reflink=desktopwebshare_permalink",
      },
      {
        date: "10/12/23",
        title: "What the West Loses by Trading With Dictatorships",
        href: "https://www.wsj.com/economy/global/what-the-west-loses-by-trading-with-dictatorships-591c6a0f?st=083vyg93s58a3jf&reflink=desktopwebshare_permalink",
      },
      {
        date: "10/12/23",
        title: "The Bank of Japan should stop defending its cap on bond yields",
        href: "https://web.archive.org/web/20231010200945/https://www.economist.com/leaders/2023/02/02/the-bank-of-japan-should-stop-defending-its-cap-on-bond-yields",
      },
      {
        date: "10/12/23",
        title: "Rising bond yields are exposing fiscal fantasy in Europe",
        href: "https://web.archive.org/web/20231011044826/https://www.economist.com/leaders/2023/10/04/rising-bond-yields-are-exposing-fiscal-fantasy-in-europe",
      },
      {
        date: "08/29/23",
        title: "Xi's Age of Stagnation",
        href: "https://archive.ph/20231015040234/https://www.foreignaffairs.com/china/xi-jinping-age-stagnation",
      },
      {
        date: "08/29/23",
        title: "Germany is Losing its Mojo",
        href: "https://www.wsj.com/world/europe/germany-is-losing-its-mojo-finding-it-again-wont-be-easy-c4b46761?st=4t0qrt9w9efawwb&reflink=desktopwebshare_permalink",
      },
    ],
  },
];
