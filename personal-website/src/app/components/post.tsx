import Link from "next/link";

export interface BlogPostSchema {
  slug: string;
  createdAt: string;
  frontMatter: Record<string, any>;
}

const PostPreview = (props: BlogPostSchema) => {
  return (
    <div>
      <p className="text-sm text-[var(--muted)]">{props.frontMatter.date}</p>

      <Link href={`/blog/${props.slug}`}>
        <h2 className="font-semibold text-xl">{props.frontMatter.title}</h2>
      </Link>
      <p className="text-[var(--muted)] italic text-sm">
        {props.frontMatter.description}
      </p>
    </div>
  );
};

export default PostPreview;
