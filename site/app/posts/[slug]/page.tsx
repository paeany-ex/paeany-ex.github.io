import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

interface Post {
  title: string;
  date: string;
  contentHtml: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      title: data.title,
      date: data.date,
      contentHtml,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);

  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace('.md', ''),
    }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <nav className="flex items-center justify-between p-4">
        <div className="text-lg font-semibold">
          <Link href="/">Archives</Link>
          <div className="flex">
            <p className="text-sm text-gray-500 hover:text-gray-600 duration-200">by Paeany</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/Archives" className="hover:text-gray-600 duration-400">Archives</Link>
          <Link href="/Projects" className="hover:text-gray-800 duration-400 font-medium">Projects</Link>
        </div>
      </nav>

      <hr />

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{new Date(post.date).toLocaleDateString()}</p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </main>

      <footer></footer>
    </div>
  );
}