import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-card-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-mono-accent text-sm font-bold text-primary-foreground">
            {">"}
          </span>
          <span className="font-mono-accent text-lg font-bold tracking-tight">
            PromptLab
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-foreground-muted sm:flex">
          <Link href="/#categories" className="transition-colors hover:text-primary">
            주제별 탐색
          </Link>
          <Link href="/#latest" className="transition-colors hover:text-primary">
            최신 프롬프트
          </Link>
        </nav>

        <Link
          href="/#categories"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-dark"
        >
          프롬프트 찾기
        </Link>
      </div>
    </header>
  );
}
