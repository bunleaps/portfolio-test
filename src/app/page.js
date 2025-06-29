import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8">
      Work In Progress Go to{" "}
      <Link href="/blog" className="text-blue-500">
        Blog
      </Link>
    </div>
  );
}
