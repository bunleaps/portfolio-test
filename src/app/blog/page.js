import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
    <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
        All Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {post.frontmatter.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                by {post.frontmatter.author}
              </p>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {post.frontmatter.description}
              </p>
              <span className="mt-4 inline-block text-blue-500 dark:text-blue-300 group-hover:underline text-sm font-medium">
                Read More &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
