import React from "react";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4">
      <header className="container mx-auto my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          My Blog
        </h1>
        <nav>
          <a
            href="/"
            className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </a>
        </nav>
      </header>
      <main className="container mx-auto">{children}</main>
      <footer className="container mx-auto mt-12 p-6 text-center text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} My MDX Blog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
