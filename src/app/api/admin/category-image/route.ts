import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { readCategories, updateCategoryImage } from "@/lib/categoriesStore";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_SIZE = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const categorySlug = formData.get("categorySlug");
  const file = formData.get("file");

  const existing =
    typeof categorySlug === "string"
      ? readCategories().find((c) => c.slug === categorySlug)
      : undefined;
  if (!existing) {
    return NextResponse.json({ error: "invalid categorySlug" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file provided" }, { status: 400 });
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "file too large (max 8MB)" }, { status: 400 });
  }

  const destDir = path.join(process.cwd(), "public", "categories");
  fs.mkdirSync(destDir, { recursive: true });

  if (existing.coverImage?.startsWith("/categories/")) {
    fs.rm(path.join(process.cwd(), "public", existing.coverImage), { force: true }, () => {});
  }

  const filename = `${existing.slug}-${Date.now()}.${ext}`;
  fs.writeFileSync(path.join(destDir, filename), Buffer.from(await file.arrayBuffer()));

  const url = `/categories/${filename}`;
  updateCategoryImage(existing.slug, url);

  return NextResponse.json({ url });
}
