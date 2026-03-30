import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), 'content/blog');

export function getAllPosts(locale: string): BlogPostMeta[] {
  const dir = path.join(contentDir, locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      image: data.image,
      slug: data.slug ?? filename.replace(/\.mdx$/, ''),
    } as BlogPostMeta;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const dir = path.join(contentDir, locale);

  if (!fs.existsSync(dir)) {
    return null;
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const fileSlug = data.slug ?? filename.replace(/\.mdx$/, '');

    if (fileSlug === slug) {
      return {
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        image: data.image,
        slug: fileSlug,
        content,
      } as BlogPost;
    }
  }

  return null;
}

export function getAllSlugs(locale: string): string[] {
  const dir = path.join(contentDir, locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data.slug ?? filename.replace(/\.mdx$/, '');
  });
}
