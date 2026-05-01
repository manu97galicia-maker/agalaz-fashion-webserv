import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, type Article } from '../articles';
import ArticleView from './ArticleView';

const BASE_URL = 'https://agalaz.com';

// Spanish-primary slugs (Spanish-keyword targeting). Other slugs default to English.
function isSpanishPrimary(slug: string): boolean {
  return /^(como-|por-que-|probador-|que-)/.test(slug);
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Article not found' };

  const url = `${BASE_URL}/blog/${article.slug}`;
  const isEs = isSpanishPrimary(article.slug);
  const title = isEs ? article.titleEs : article.title;
  const description = isEs ? article.descriptionEs : article.description;
  const category = isEs ? (article.categoryEs ?? article.category) : article.category;

  return {
    title,
    description,
    keywords: [article.keyword],
    authors: [{ name: 'Agalaz Fashion', url: BASE_URL }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Agalaz Fashion',
      locale: isEs ? 'es_ES' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_ES',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: ['Agalaz Fashion'],
      tags: [article.keyword, category, 'virtual try-on', 'AI fashion'].filter(Boolean) as string[],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@agalaz',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: category ?? 'fashion',
  };
}

// --- Topic similarity (keyword + category + title-word overlap) ---
const STOPWORDS = new Set([
  'the','a','an','and','or','but','of','to','in','for','on','with','at','by','from',
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'will','would','can','could','should','may','might','must','shall',
  'i','you','he','she','it','we','they','this','that','these','those',
  'how','why','what','when','where','which','who','whom',
  'your','my','our','their','his','her','its',
  'not','no','if','then','than','so','as','too','very',
  'best','vs','via','use','using','one','get','make','tips','guide',
]);

function tokenize(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
}

function similarity(a: Article, b: Article): number {
  const aTok = tokenize(`${a.title} ${a.keyword} ${a.category ?? ''}`);
  const bTok = tokenize(`${b.title} ${b.keyword} ${b.category ?? ''}`);
  let overlap = 0;
  for (const t of aTok) if (bTok.has(t)) overlap++;
  const union = new Set([...aTok, ...bTok]).size;
  const jaccard = union ? overlap / union : 0;
  const categoryBoost = a.category && b.category && a.category === b.category ? 0.2 : 0;
  return jaccard + categoryBoost;
}

function pickRelated(article: Article, all: Article[], n = 3): Article[] {
  return all
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({ a, score: similarity(article, a) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, n)
    .map((x) => x.a);
}

// --- FAQ extraction from question-style H2/H3 ---
const QUESTION_STARTERS = /^(how|why|what|when|where|which|who|can|do|does|is|are|should|will|would)\b/i;

function extractFaq(content: string): { question: string; answer: string }[] {
  const blocks = content.split('\n\n');
  const faqs: { question: string; answer: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i].trim();
    const m = b.match(/^##+ +(.+)$/);
    if (!m) continue;
    const heading = m[1].replace(/^\d+\.\s*/, '').trim();
    const isQuestion = QUESTION_STARTERS.test(heading) || heading.endsWith('?');
    if (!isQuestion) continue;
    // collect first non-heading paragraph as answer
    let answer = '';
    for (let j = i + 1; j < blocks.length && j < i + 4; j++) {
      const next = blocks[j].trim();
      if (!next || next.startsWith('#') || next.startsWith('---')) continue;
      answer = next.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
      break;
    }
    if (!answer) continue;
    faqs.push({
      question: heading.endsWith('?') ? heading : `${heading}?`,
      answer: answer.length > 320 ? answer.slice(0, 317).trim() + '...' : answer,
    });
    if (faqs.length >= 6) break;
  }
  return faqs;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = pickRelated(article, articles, 3);
  const isEs = isSpanishPrimary(article.slug);
  const ldTitle = isEs ? article.titleEs : article.title;
  const ldDescription = isEs ? article.descriptionEs : article.description;
  const ldCategory = isEs ? (article.categoryEs ?? article.category) : article.category;
  const ldContent = isEs ? article.contentEs : article.content;
  const wordCount = ldContent.split(/\s+/).length;
  const url = `${BASE_URL}/blog/${article.slug}`;
  const ogImage = `${BASE_URL}/blog/${article.slug}/opengraph-image`;

  const articleLd = {
    '@type': 'BlogPosting',
    headline: ldTitle,
    description: ldDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Agalaz Fashion', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Agalaz Fashion',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/icon-512.png` },
    },
    image: ogImage,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: isEs ? 'es-ES' : 'en-US',
    keywords: article.keyword,
    articleSection: ldCategory,
    wordCount,
    url,
  };

  const breadcrumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: ldTitle, item: url },
    ],
  };

  const faqs = extractFaq(ldContent);
  const faqLd =
    faqs.length >= 2
      ? {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  // Single @graph block — fewer <script> tags, valid Schema.org grouping.
  const ld = {
    '@context': 'https://schema.org',
    '@graph': faqLd ? [articleLd, breadcrumbLd, faqLd] : [articleLd, breadcrumbLd],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ArticleView article={article} related={related} lang={isEs ? 'es' : 'en'} />
    </>
  );
}
