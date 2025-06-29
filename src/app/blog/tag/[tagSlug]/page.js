import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/BlogPostCard"; // Import the new component

// Define the path to your blog MDX files
const BLOG_DIRECTORY = path.join(process.cwd(), "src", "blog");

// Function to get all blog posts (re-used from src/app/blog/page.jsx)
function getBlogPosts() {
  const filenames = fs.readdirSync(BLOG_DIRECTORY);

  const posts = filenames.map((filename) => {
    const filePath = path.join(BLOG_DIRECTORY, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);

    return {
      slug: filename.replace(/\.mdx$/, ""), // Remove .mdx extension for the slug
      frontmatter,
    };
  });

  // Sort posts by date in descending order
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

// generateStaticParams to pre-render tag pages
export async function generateStaticParams() {
  const allPosts = getBlogPosts();
  const tags = new Set();

  allPosts.forEach((post) => {
    if (post.frontmatter.tags && Array.isArray(post.frontmatter.tags)) {
      post.frontmatter.tags.forEach((tag) => {
        tags.add(tag.toLowerCase().replace(/\s+/g, "-")); // Normalize tag slug
      });
    }
  });

  return Array.from(tags).map((tagSlug) => ({
    tagSlug: tagSlug,
  }));
}

export default function TagPage({ params }) {
  const { tagSlug } = params;
  const allPosts = getBlogPosts();

  // Decode and normalize the tag slug back to its original form for display
  const displayTag = decodeURIComponent(tagSlug).replace(/-/g, " ");

  // Filter posts that include the current tagSlug
  const filteredPosts = allPosts.filter((post) => {
    if (post.frontmatter.tags && Array.isArray(post.frontmatter.tags)) {
      return post.frontmatter.tags.some(
        (tag) => tag.toLowerCase().replace(/\s+/g, "-") === tagSlug
      );
    }
    return false;
  });

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
        Posts tagged with:{" "}
        <span className="capitalize text-blue-600 dark:text-blue-400">
          {displayTag}
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-12">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-8">
          No posts found for this tag.
        </p>
      )}
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
