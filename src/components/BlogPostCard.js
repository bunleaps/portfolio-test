import React from "react";
import Link from "next/link";

export default function BlogPostCard({ post }) {
  return (
    <div className="group block bg-white dark:bg-gray-950 p-8 md:p-10 rounded-xl  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200 leading-snug">
          {post.frontmatter.title}
        </h3>
      </Link>
      <p className="text-base text-gray-600 dark:text-gray-400 mb-3">
        {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        by {post.frontmatter.author}
      </p>
      {/* Display tags on tag page for context */}
      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.frontmatter.tags.map((tag) => (
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
      <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-6 line-clamp-3">
        {post.frontmatter.description}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors duration-200"
      >
        Read More
        <svg
          className="ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
