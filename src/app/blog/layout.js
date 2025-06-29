import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
      {" "}
      {/* Very light background, smooth font rendering */}
      <header className="py-6 border-b border-gray-100 dark:border-gray-800">
        {" "}
        {/* Subtle bottom border */}
        <div className="container mx-auto max-w-5xl px-4 flex justify-between items-center">
          <Link
            href="/blog"
            className="text-2xl font-bold text-gray-900 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Blog
          </Link>
          <nav>
            <Link
              href="/"
              className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {" "}
        {/* Allows main content to expand */}
        {children}
      </main>
      <footer className="py-8 text-center text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 mt-12">
        {" "}
        {/* Subtle top border */}
        <div className="container mx-auto max-w-3xl px-4">
          <p>
            &copy; {new Date().getFullYear()} Bunleap Sorn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
