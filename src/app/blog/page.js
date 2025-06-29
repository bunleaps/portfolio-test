import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import BlogPostCard from "@/components/BlogPostCard"; // Import the new component

// Define the path to your blog MDX files
const BLOG_DIRECTORY = path.join(process.cwd(), "src", "blog");

// Function to get all blog posts
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

export default function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
        Thoughts & Insights
      </h2>
      <div className="grid grid-cols-1 gap-12">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} /> // Use BlogPostCard here
        ))}
      </div>
    </div>
  );
}
