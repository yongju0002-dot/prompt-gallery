"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCategoryForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/admin/categories", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "생성에 실패했어요");
      }
      form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했어요");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-card-border bg-card p-4 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-1.5 text-sm">
        <span className="text-foreground-muted">카테고리 이름</span>
        <input name="label" required placeholder="예: 캘리그라피" className={inputClass} />
      </label>
      <label className="flex flex-1 flex-col gap-1.5 text-sm">
        <span className="text-foreground-muted">대표 이미지 (선택)</span>
        <input
          type="file"
          name="file"
          accept="image/png,image/jpeg,image/webp"
          className={inputClass}
        />
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {saving ? "만드는 중…" : "카테고리 만들기"}
      </button>
    </form>
  );
}
