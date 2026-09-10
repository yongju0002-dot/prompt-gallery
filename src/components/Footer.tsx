export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background-alt">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-foreground-muted">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-accent text-base font-bold text-foreground">
            {">"} PromptLab
          </p>
          <p>결과물부터 확인하고 바로 가져가는 AI 프롬프트 갤러리</p>
        </div>
        <p className="mt-6 text-xs text-foreground-muted/80">
          © {new Date().getFullYear()} PromptLab. 모든 프롬프트는 참고용 예시이며, 생성 결과는 모델과 설정에 따라 달라질 수 있어요.
        </p>
      </div>
    </footer>
  );
}
