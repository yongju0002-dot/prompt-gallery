import Link from "next/link";
import { PromptItem } from "@/lib/types";
import { getCategoryBySlug } from "@/data/categories";
import { getModelBySlug } from "@/data/models";
import PromptMedia from "./PromptMedia";

export default function PromptCard({ prompt }: { prompt: PromptItem }) {
  const category = getCategoryBySlug(prompt.categorySlug);
  const model = getModelBySlug(prompt.modelSlug);

  return (
    <Link
      href={`/prompt/${prompt.id}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-card-border shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <PromptMedia prompt={prompt} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        <div className="flex items-center gap-1.5 text-xs text-white/70">
          {category && <span>{category.label}</span>}
          {model && <span>·</span>}
          {model && (
            <span className="font-mono-accent text-[11px] uppercase tracking-wide">
              {model.label}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold leading-snug text-white drop-shadow group-hover:text-white/90">
          {prompt.title}
        </h3>
        <p className="line-clamp-1 text-xs text-white/70">{prompt.summary}</p>
        {typeof prompt.promptCount === "number" && (
          <p className="font-mono-accent text-[11px] text-white/60">
            관련 프롬프트 {prompt.promptCount}개
          </p>
        )}
      </div>
    </Link>
  );
}
