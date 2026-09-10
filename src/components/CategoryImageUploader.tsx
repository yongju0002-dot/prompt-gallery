"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryImageUploader({ categorySlug }: { categorySlug: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const router = useRouter();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("categorySlug", categorySlug);
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/category-image", { method: "POST", body: formData });
      if (!res.ok) throw new Error("upload failed");
      setStatus("idle");
      router.refresh();
    } catch {
      setStatus("error");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        id={`cat-upload-${categorySlug}`}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor={`cat-upload-${categorySlug}`}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-dashed border-card-border bg-background px-2.5 py-1.5 text-xs text-foreground-muted transition-colors hover:border-primary hover:text-primary"
      >
        {status === "uploading" ? "업로드 중…" : status === "error" ? "실패, 다시 시도" : "이미지 바꾸기"}
      </label>
    </div>
  );
}
