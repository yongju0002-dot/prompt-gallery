import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";
import { getCategories } from "@/data/categories";
import { models } from "@/data/models";
import { getAllPrompts } from "@/data/prompts";
import AdminPromptForm from "@/components/AdminPromptForm";
import AdminDeleteButton from "@/components/AdminDeleteButton";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import CategoryImageUploader from "@/components/CategoryImageUploader";
import AdminCategoryForm from "@/components/AdminCategoryForm";
import AdminCategoryDeleteButton from "@/components/AdminCategoryDeleteButton";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const allPrompts = getAllPrompts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">관리자</h1>
        <AdminLogoutButton />
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold">새 카테고리 만들기</h2>
        <AdminCategoryForm />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold">카테고리 ({categories.length})</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <div
              key={c.slug}
              className="flex flex-col gap-2 rounded-lg border border-card-border bg-card p-3"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-background-alt">
                {c.coverImage ? (
                  <Image src={c.coverImage} alt={c.label} fill className="object-cover" />
                ) : (
                  <div className="font-mono-accent flex h-full w-full items-center justify-center text-2xl font-bold text-foreground-muted">
                    {c.label.charAt(0)}
                  </div>
                )}
              </div>
              <p className="truncate text-xs text-foreground-muted">{c.label}</p>
              <CategoryImageUploader categorySlug={c.slug} />
              <AdminCategoryDeleteButton categorySlug={c.slug} />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold">새 프롬프트 만들기</h2>
        <AdminPromptForm categories={categories} models={models} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold">
          등록된 프롬프트 ({allPrompts.length})
        </h2>
        {allPrompts.length === 0 ? (
          <p className="text-sm text-foreground-muted">
            아직 만든 프롬프트가 없어요. 위 폼으로 첫 프롬프트를 만들어보세요.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {allPrompts.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-card-border bg-card px-4 py-3"
              >
                <Link
                  href={`/prompt/${p.id}`}
                  className="min-w-0 flex-1 truncate text-sm hover:text-primary"
                >
                  {p.title}
                </Link>
                <AdminDeleteButton promptId={p.id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
