import type { Metadata } from 'next';
import { articles } from '../articles';

const BASE_URL = 'https://agalaz.com';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keyword.split(',').map((k) => k.trim()),
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: ['Agalaz Fashion'],
      siteName: 'Agalaz Fashion',
      url: `${BASE_URL}/blog/${slug}`,
      locale: 'en_US',
      alternateLocale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
