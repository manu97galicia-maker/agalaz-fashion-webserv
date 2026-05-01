// Metadata is owned by page.tsx (it has slug-language and image-aware logic).
// This layout exists only as the route segment wrapper.
export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
