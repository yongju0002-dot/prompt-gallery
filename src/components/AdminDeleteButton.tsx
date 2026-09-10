"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDeleteButton({ promptId }: { promptId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("이 프롬프트를 삭제할까요?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/prompts/${promptId}`, { method: "DELETE" });
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
      className="shrink-0 rounded-md border border-card-border px-2.5 py-1 text-xs text-foreground-muted transition-colors hover:border-red-400 hover:text-red-500 disabled:opacity-60"
    >
      {loading ? "삭제 중…" : "삭제"}
    </button>
  );
}
