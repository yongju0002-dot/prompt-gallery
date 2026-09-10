import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/data/categories";
import { getModelBySlug } from "@/data/models";
import { getPromptById, getRelatedPrompts } from "@/data/prompts";
import { isAdmin } from "@/lib/isAdmin";
import PromptMedia from "@/components/PromptMedia";
import PromptCard from "@/components/PromptCard";
import CopyButton from "@/components/CopyButton";
import PromptImageUploader from "@/components/PromptImageUploader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) return {};
  return {
    title: `${prompt.title} | PromptLab`,
    description: prompt.summary,
  };
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) notFound();

  const category = getCategoryBySlug(prompt.categorySlug);
  const model = getModelBySlug(prompt.modelSlug);
  const related = getRelatedPrompts(prompt);
  const admin = await isAdmin();

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link
        href={category ? `/category/${category.slug}` : "/"}
        className="mb-6 inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-primary"
      >
        ← {category ? `${category.label} 목록으로` : "전체 프롬프트로 돌아가기"}
      </Link>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <PromptMedia
            prompt={prompt}
            className="aspect-square w-full rounded-2xl border border-card-border"
          />
          {admin && <PromptImageUploader promptId={prompt.id} />}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="rounded-md bg-background-alt px-3 py-1 transition-colors hover:text-primary"
              >
                {category.label}
              </Link>
            )}
            {model && (
              <span className="font-mono-accent rounded-md bg-background-alt px-3 py-1 text-xs uppercase tracking-wide">
                {model.label}
              </span>
            )}
            {prompt.aspectRatio && (
              <span className="font-mono-accent rounded-md bg-background-alt px-3 py-1 text-xs">
                {prompt.aspectRatio}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">{prompt.title}</h1>
          <p className="text-foreground-muted">{prompt.summary}</p>

          {prompt.needsReferencePhoto && (
            <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
              이 프롬프트는 본인 사진을 업로드해야 동작해요. 생성 모델에
              프롬프트와 함께 사진을 첨부해서 사용하세요.
            </div>
          )}

          <div className="rounded-xl border border-card-border bg-card p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {prompt.promptText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CopyButton text={prompt.promptText} />
            {prompt.tags && (
              <div className="flex flex-wrap gap-1.5">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-background-alt px-2.5 py-1 text-xs text-foreground-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold">비슷한 프롬프트</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
