import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailPage from "@/components/pages/NewsDetailPage";
import { NEWS, hasBody } from "@/content/site";

// Halaman detail hanya dibuat untuk artikel yang isinya sudah diisi.
export function generateStaticParams() {
  return NEWS.filter(hasBody).map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/berita/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS.find((n) => n.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt ?? article.body?.find((b) => !b.startsWith("## "))?.slice(0, 160),
    openGraph: { type: "article", publishedTime: article.date, images: article.image ? [article.image] : undefined },
  };
}

export default async function Page({ params }: PageProps<"/berita/[slug]">) {
  const { slug } = await params;
  const article = NEWS.find((n) => n.slug === slug);
  if (!article || !hasBody(article)) notFound();
  return <NewsDetailPage article={article} />;
}
