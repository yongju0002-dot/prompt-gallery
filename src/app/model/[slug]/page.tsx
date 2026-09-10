import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { models, getModelBySlug } from "@/data/models";
import { getPromptsByModel } from "@/data/prompts";
import PromptGrid from "@/components/PromptGrid";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return {
    title: `${model.label} 프롬프트 | PromptLab`,
    description: `${model.label} 모델로 생성한 AI 프롬프트 모음`,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const items = getPromptsByModel(model.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-primary"
      >
        ← 전체 모델로 돌아가기
      </Link>

      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono-accent grid h-12 w-12 place-items-center rounded-xl bg-background-alt text-xs uppercase text-foreground-muted">
          {model.mediaType === "video" ? "VID" : "IMG"}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{model.label}</h1>
          <p className="font-mono-accent text-sm text-foreground-muted">
            프롬프트 {items.length}개
          </p>
        </div>
      </div>

      <PromptGrid prompts={items} />
    </div>
  );
}
