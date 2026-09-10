import { PromptItem } from "@/lib/types";
import PromptCard from "./PromptCard";

export default function PromptGrid({ prompts }: { prompts: PromptItem[] }) {
  if (prompts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-card-border bg-card px-6 py-16 text-center text-foreground-muted">
        아직 이 그룹에는 프롬프트가 없어요. 곧 채워질 예정이에요.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {prompts.map((p) => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}
