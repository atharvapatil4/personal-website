import Link from "next/link";

export interface BlogPostSchema {
  slug: string;
  createdAt: string;
  frontMatter: Record<string, any>;
}

const PostPreview = (props: BlogPostSchema) => {
  return (
    <div className="">
      <p className="text-sm text-slate-400">{props.frontMatter.date}</p>

      <Link href={`/blog/${props.slug}`}>
        <h2 className=" font-semibold text-blue-500 text-xl hover:underline">
          {props.frontMatter.title}
        </h2>
      </Link>
      <p className="text-slate-700 italic text-sm">
        {props.frontMatter.description}
      </p>
    </div>
  );
};

export default PostPreview;
