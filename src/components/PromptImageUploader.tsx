"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PromptImageUploader({ promptId }: { promptId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const router = useRouter();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("promptId", promptId);
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("upload failed");
      setStatus("done");
      router.refresh();
    } catch {
      setStatus("error");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const label =
    status === "uploading"
      ? "업로드 중…"
      : status === "done"
        ? "완료 ✓ 다른 사진으로 바꾸기"
        : status === "error"
          ? "업로드 실패, 다시 시도"
          : "🖼️ 이 프롬프트에 이미지 넣기";

  return (
    <div>
      <input
        ref={inputRef}
        id={`upload-${promptId}`}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor={`upload-${promptId}`}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-card-border bg-card px-3 py-2 text-xs text-foreground-muted transition-colors hover:border-primary hover:text-primary"
      >
        {label}
      </label>
    </div>
  );
}
