import { getCategories } from "@/data/categories";
import { getLatestPrompts } from "@/data/prompts";
import CategoryTile from "@/components/CategoryTile";
import PromptGrid from "@/components/PromptGrid";

export default function Home() {
  const latest = getLatestPrompts(8);
  const categories = getCategories();

  return (
    <div className="flex flex-col">
      <section className="border-b border-card-border bg-background-alt">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-16 text-center sm:py-24">
          <span className="font-mono-accent rounded-md bg-card px-3 py-1 text-xs text-primary shadow-sm">
            결과물부터 확인하는 AI 프롬프트
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            바로 쓰는 AI 프롬프트,
            <br className="sm:hidden" /> 결과로 먼저 확인하세요
          </h1>
          <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
            프롬프트마다 실제 생성 결과를 함께 보여드려요. 원하는 결과를
            먼저 고르고, 프롬프트를 복사해서 바로 사용해보세요.
          </p>
        </div>
      </section>

      <section id="categories" className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-bold">주제별 탐색</h2>
          <span className="font-mono-accent text-xs text-foreground-muted">
            {categories.length}개 주제
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section id="latest" className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-bold">최신 프롬프트</h2>
          <span className="font-mono-accent text-xs text-foreground-muted">
            최근 등록 {latest.length}개
          </span>
        </div>
        <PromptGrid prompts={latest} />
      </section>
    </div>
  );
}
