import Link from 'next/link';

export default function About() {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between p-4">
        <div className="text-lg font-semibold flex flex-col">
          <Link href="/">Archives</Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-gray-600 duration-200">by Paeany</Link>
        </div>
        {/* Only show on small screens*/}
        <div className="md:hidden flex space-x-4 mt-2">
          <Link href="/archives" className="hover:text-gray-600 duration-400">Archives</Link>
          <Link href="/projects" className="hover:text-gray-800 duration-400 font-medium">Projects</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/archives" className="hover:text-gray-600 duration-400">Archives</Link>
          <Link href="/projects" className="hover:text-gray-800 duration-400 font-medium">Projects</Link>
        </div>
      </nav>

      <hr />

      <main className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">About Me</h1>
        <p className="mb-4">
          Hi, I'm Paeany. Welcome to my personal blog where I share thoughts on technology, life, and everything in between.
        </p>
        <p>
           cybersecurity and other things.
        </p>
      </main>
      <footer></footer>
    </div>
  );
}