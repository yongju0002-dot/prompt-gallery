"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCategoryDeleteButton({ categorySlug }: { categorySlug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("이 카테고리를 삭제할까요? 이 카테고리에 속한 프롬프트는 남지만 카테고리 표시가 사라져요.")) {
      return;
    }
    setLoading(true);
    try {
      await fetch(`/api/admin/categories/${categorySlug}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-md border border-card-border px-2 py-1 text-[11px] text-foreground-muted transition-colors hover:border-red-400 hover:text-red-500 disabled:opacity-60"
    >
      {loading ? "삭제 중…" : "삭제"}
    </button>
  );
}
