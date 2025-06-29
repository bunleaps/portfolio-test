import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import MdxViewer from "@/components/MdxViewer"; // Import the new client component
import Link from "next/link"; // Keep Link for navigation outside MDX content

// Define the path to your blog MDX files
const BLOG_DIRECTORY = path.join(process.cwd(), "src", "blog");

// generateStaticParams is used to pre-render routes at build time.
// This function remains in the Server Component.
export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIRECTORY);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

// Function to get a single blog post's content
async function getPost(slug) {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  // Serialize the MDX content for next-mdx-remote
  // This serialization still happens on the server
  const mdxSource = await serialize(content, {
    scope: frontmatter,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    frontmatter,
    mdxSource,
  };
}

export default async function BlogPostPage({ params }) {
  // Await params to ensure it's fully resolved before accessing properties
  const { slug } = await params; // Added 'await' here
  const post = await getPost(slug);

  if (!post) {
    notFound(); // Redirect to 404 page if post not found
  }

  const { frontmatter, mdxSource } = post;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16 bg-white dark:bg-gray-950 rounded-lg shadow-sm">
      {" "}
      {/* Minimalist outer container */}
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
          {frontmatter.title}
        </h1>
        <p className="text-center text-base text-gray-600 dark:text-gray-400 mb-6">
          Published on{" "}
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          by {frontmatter.author}
        </p>
        {/* Display tags for the single post */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {" "}
            {/* More vertical spacing */}
            {frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(
                  tag.toLowerCase().replace(/\s+/g, "-")
                )}`}
                className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <div className="border-t border-b border-gray-100 dark:border-gray-800 py-8 mb-8">
          {" "}
          {/* Softer borders, more padding */}
          {/* Render the MDX content using the new Client Component */}
          <MdxViewer mdxSource={mdxSource} />
        </div>
      </article>
      <div className="text-center mt-12">
        {" "}
        {/* More margin top */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors duration-200"
        >
          <svg
            className="mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to all posts
        </Link>
      </div>
    </div>
  );
}
