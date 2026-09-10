"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, ModelInfo } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-foreground-muted">{label}</span>
      {children}
    </label>
  );
}

export default function AdminPromptForm({
  categories,
  models,
}: {
  categories: Category[];
  models: ModelInfo[];
}) {
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
      const res = await fetch("/api/admin/prompts", { method: "POST", body: formData });
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-card-border bg-card p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="제목">
          <input name="title" required className={inputClass} />
        </Field>
        <Field label="한 줄 요약">
          <input name="summary" required className={inputClass} />
        </Field>
      </div>

      <Field label="프롬프트 (네거티브까지 포함해 통째로, 영어 권장)">
        <textarea name="promptText" required rows={8} className={inputClass} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="카테고리">
          <select name="categorySlug" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              선택하세요
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="모델">
          <select name="modelSlug" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              선택하세요
            </option>
            {models.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="미디어 타입">
          <select name="mediaType" defaultValue="image" className={inputClass}>
            <option value="image">이미지</option>
            <option value="video">영상</option>
          </select>
        </Field>
        <Field label="비율 (선택)">
          <input name="aspectRatio" placeholder="예: 1:1, 9:16" className={inputClass} />
        </Field>
        <Field label="태그 (쉼표로 구분)">
          <input name="tags" placeholder="예: UI, 다크모드" className={inputClass} />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        <input type="checkbox" name="needsReferencePhoto" />
        사진 업로드가 필요한 프롬프트예요 (img2img)
      </label>

      <Field label="예시 이미지 (선택, 나중에 상세 페이지에서 추가해도 돼요)">
        <input
          type="file"
          name="file"
          accept="image/png,image/jpeg,image/webp"
          className={inputClass}
        />
      </Field>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {saving ? "만드는 중…" : "프롬프트 만들기"}
      </button>
    </form>
  );
}
