import Image from "next/image";
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames
      .filter(filename => filename.endsWith('.md'))
      .map(async filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = filename.replace('.md', '');
        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between p-4">
        <div className="text-lg font-semibold">
          <Link href="/">Archives</Link>
          <div className="flex">
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-600 duration-200">by Paeany</Link>
          </div>
          {/* Only show on small screens*/}
          <div className="md:hidden flex space-x-4 mt-2">
            <Link href="/archives" className="hover:text-blue-600 duration-400">Archives</Link>
            <Link href="/projects" className="hover:text-blue-800 duration-400 font-medium">Projects</Link>
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-600 duration-200">by Paeany</Link>
          </div>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/archives" className="hover:text-gray-600 duration-400">Archives</Link>
          <Link href="/projects" className="hover:text-gray-800 duration-400 font-medium">Projects</Link>
        </div>
      </nav>

      <hr />

      <main className="min-h-screen p-4 justify-between flex">
        <div>
          <h1 className="text-lg font-bold mb-4 uppercase font-serif italic max-w-lg">
            "The most beautiful thing we can experience is the mysterious." – Albert Einstein
          </h1>

          <div className="space-y-4">
          {posts.map(post => (
            <div key={post.slug} className="border pb-4 mb-4 p-4">
              <Link href={`/posts/${post.slug}`} className="text-xl font-medium hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
              <p className="mt-2">{post.excerpt}</p>
            </div>
          ))}
          </div>
        </div>

        <div className="md:max-xl:block hidden">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <ul className="space-y-2">
            <li><Link href="/projects/1" className="hover:underline">Project 1</Link></li>
            <li><Link href="/projects/2" className="hover:underline">Project 2</Link></li>
            <li><Link href="/projects/3" className="hover:underline">Project 3</Link></li>
          </ul>
        </div>
 
      </main>
      <footer></footer>
    </div>
  );
}
