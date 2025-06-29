"use client";

import dynamic from "next/dynamic";

// Dynamically import MDXRemote with ssr: false to ensure it only runs on the client
const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((mod) => mod.MDXRemote),
  {
    ssr: false,
  }
);

const components = {
  MyCustomDiv: ({ children }) => (
    <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 my-4 rounded-md">
      {children}
    </div>
  ),
  h1: ({ children }) => (
    <h1 className="text-4xl font-extrabold my-6 text-blue-700 dark:text-blue-300">
      {children}
    </h1>
  ),
  p: ({ children }) => (
    <p className="text-lg leading-relaxed my-4 text-gray-800 dark:text-gray-200">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside ml-4 my-4 text-gray-800 dark:text-gray-200">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside ml-4 my-4 text-gray-800 dark:text-gray-200">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  pre: ({ children }) => (
    <pre className="bg-gray-800 dark:bg-gray-900 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-300 px-1 py-0.5 rounded-sm text-sm">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 dark:text-gray-400 my-4">
      {children}
    </blockquote>
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      className="max-w-full h-auto rounded-lg shadow-md my-6"
      alt={props.alt || ""}
    />
  ),
};

export default function MdxViewer({ mdxSource }) {
  // Check if mdxSource is available before rendering MDXRemote
  if (!mdxSource) {
    return null; // Or a loading spinner, or an error message
  }
  return <MDXRemote {...mdxSource} components={components} />;
}
