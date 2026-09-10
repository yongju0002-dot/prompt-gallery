import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { deleteCategory, readCategories } from "@/lib/categoriesStore";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const existing = readCategories().find((c) => c.slug === slug);

  if (existing?.coverImage?.startsWith("/categories/")) {
    fs.rm(path.join(process.cwd(), "public", existing.coverImage), { force: true }, () => {});
  }

  deleteCategory(slug);
  return NextResponse.json({ ok: true });
}
