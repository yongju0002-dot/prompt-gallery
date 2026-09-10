import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { addCategory } from "@/lib/categoriesStore";
import { Category } from "@/lib/types";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_SIZE = 8 * 1024 * 1024;

function randomSlug() {
  return `cat_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const label = String(formData.get("label") ?? "").trim();
  const file = formData.get("file");

  if (!label) {
    return NextResponse.json({ error: "카테고리 이름은 필수예요" }, { status: 400 });
  }

  const slug = randomSlug();
  let coverImage: string | undefined;

  if (file instanceof File && file.size > 0) {
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "지원하지 않는 이미지 형식이에요 (jpg/png/webp만 가능)" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "파일이 너무 커요 (최대 8MB)" }, { status: 400 });
    }
    const destDir = path.join(process.cwd(), "public", "categories");
    fs.mkdirSync(destDir, { recursive: true });
    const filename = `${slug}.${ext}`;
    fs.writeFileSync(path.join(destDir, filename), Buffer.from(await file.arrayBuffer()));
    coverImage = `/categories/${filename}`;
  }

  const item: Category = { slug, label, coverImage };
  addCategory(item);

  return NextResponse.json(item);
}
