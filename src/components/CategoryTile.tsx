import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types";
import { getPromptsByCategory } from "@/data/prompts";
import PromptMedia from "./PromptMedia";

export default function CategoryTile({ category }: { category: Category }) {
  const items = getPromptsByCategory(category.slug);
  const cover = items[0];

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block aspect-[19/30] w-full overflow-hidden rounded-xl border border-card-border shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      {category.coverImage ? (
        <Image
          src={category.coverImage}
          alt={category.label}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      ) : cover ? (
        <PromptMedia prompt={cover} className="absolute inset-0 h-full w-full" />
      ) : (
        <div className="font-mono-accent absolute inset-0 flex items-center justify-center bg-background-alt text-3xl font-bold text-foreground-muted">
          {category.label.charAt(0)}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
        <span className="font-medium text-white drop-shadow group-hover:text-white/90">
          {category.label}
        </span>
        <span className="font-mono-accent shrink-0 rounded-md bg-black/40 px-2 py-0.5 text-xs text-white">
          {items.length}개
        </span>
      </div>
    </Link>
  );
}
