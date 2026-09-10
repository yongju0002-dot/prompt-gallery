import Link from "next/link";
import { ModelInfo } from "@/lib/types";
import { getPromptsByModel } from "@/data/prompts";

export default function ModelTile({ model }: { model: ModelInfo }) {
  const count = getPromptsByModel(model.slug).length;

  return (
    <Link
      href={`/model/${model.slug}`}
      className="group flex flex-col justify-between gap-4 rounded-xl border border-card-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono-accent rounded-md bg-background-alt px-2 py-0.5 text-[11px] uppercase tracking-wide text-foreground-muted">
          {model.mediaType === "video" ? "영상" : "이미지"}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-medium text-foreground group-hover:text-primary">
          {model.label}
        </span>
        <span className="font-mono-accent text-xs text-foreground-muted">
          {count}개
        </span>
      </div>
    </Link>
  );
}
