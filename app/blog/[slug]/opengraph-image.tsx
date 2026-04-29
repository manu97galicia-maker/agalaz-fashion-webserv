import { ImageResponse } from 'next/og';
import { articles } from '../articles';

export const runtime = 'edge';
export const alt = 'Agalaz Fashion blog article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const title = article?.title ?? 'Agalaz Fashion';
  const category = article?.category ?? 'Agalaz Blog';
  const readTime = article?.readTime ?? 5;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: '0.3em',
              color: '#0f172a',
              fontWeight: 900,
            }}
          >
            AGALAZ
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#94a3b8',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginLeft: '12px',
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 56 : title.length > 40 ? 68 : 80,
            color: '#0f172a',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #e2e8f0',
            paddingTop: '32px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#475569',
              fontWeight: 600,
            }}
          >
            agalaz.com/blog
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#6366f1',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            {readTime} min read
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
