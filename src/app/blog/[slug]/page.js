import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import MdxViewer from "../../../components/MdxViewer"; // Import the new client component
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
  const mdxSource = await serialize(content, { scope: frontmatter });

  return {
    frontmatter,
    mdxSource,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound(); // Redirect to 404 page if post not found
  }

  const { frontmatter, mdxSource } = post;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-blue-700 dark:text-blue-300">
          {frontmatter.title}
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Published on{" "}
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          by {frontmatter.author}
        </p>
        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-8">
          {/* Render the MDX content using the new Client Component */}
          <MdxViewer mdxSource={mdxSource} />
        </div>
      </article>
      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          &larr; Back to all posts
        </Link>
      </div>
    </div>
  );
}
