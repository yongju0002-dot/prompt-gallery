import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/data/categories";
import { getPromptsByCategory } from "@/data/prompts";
import PromptGrid from "@/components/PromptGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.label} 프롬프트 | PromptLab`,
    description: `${category.label} 카테고리의 AI 프롬프트 모음`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getPromptsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-primary"
      >
        ← 전체 카테고리로 돌아가기
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">{category.label}</h1>
        <p className="font-mono-accent text-sm text-foreground-muted">
          프롬프트 {items.length}개
        </p>
      </div>

      <PromptGrid prompts={items} />
    </div>
  );
}
