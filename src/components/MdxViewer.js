"use client"; // This explicitly marks it as a Client Component

import dynamic from "next/dynamic"; // Import dynamic for client-side loading
import React from "react";
import CodeRenderer from "@/components/CodeRenderer"; // Import the CodeRenderer component

// Dynamically import MDXRemote with ssr: false to ensure it only runs on the client
const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((mod) => mod.MDXRemote),
  {
    ssr: false,
  }
);

// Custom components for MDX rendering, with minimalist styling
const components = {
  // Example custom component (if you use it in your MDX)
  MyCustomDiv: ({ children }) => (
    <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-200 dark:border-blue-700 text-gray-800 dark:text-gray-200 p-4 my-6 rounded-md">
      {children}
    </div>
  ),
  // Restyled HTML elements for minimalist look
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 mt-12 text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold mb-5 mt-10 text-gray-900 dark:text-gray-100 tracking-tight leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-200 leading-normal">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-lg leading-relaxed my-5 text-gray-800 dark:text-gray-200">
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
    <ul className="list-disc my-6 text-gray-800 dark:text-gray-200 space-y-2 pl-6">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal my-6 text-gray-800 dark:text-gray-200 space-y-2 pl-6">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-6 py-2 italic text-gray-600 dark:text-gray-400 my-8 bg-gray-50 dark:bg-gray-900 rounded-r-lg">
      {children}
    </blockquote>
  ),
  // Map all 'code' elements to our CodeRenderer component
  code: CodeRenderer,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      className="max-w-full h-auto rounded-lg shadow-md my-10 mx-auto block"
      alt={props.alt || ""}
    />
  ),
  // Table styling for minimalist look
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="w-full text-left border-collapse text-gray-800 dark:text-gray-200">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider bg-gray-50 dark:bg-gray-800">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-base">
      {children}
    </td>
  ),
};

export default function MdxViewer({ mdxSource }) {
  if (!mdxSource) {
    return null;
  }
  return <MDXRemote {...mdxSource} components={components} />;
}
