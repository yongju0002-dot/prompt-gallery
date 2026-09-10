import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCategories } from "@/data/categories";
import { models } from "@/data/models";
import { addPrompt } from "@/lib/promptsStore";
import { MediaType, PromptItem } from "@/lib/types";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_SIZE = 8 * 1024 * 1024;

function randomId() {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const promptText = String(formData.get("promptText") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "");
  const modelSlug = String(formData.get("modelSlug") ?? "");
  const mediaType = String(formData.get("mediaType") ?? "image") as MediaType;
  const aspectRatio = String(formData.get("aspectRatio") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  const needsReferencePhoto = formData.get("needsReferencePhoto") === "on";
  const file = formData.get("file");

  if (!title || !summary || !promptText) {
    return NextResponse.json(
      { error: "제목, 요약, 프롬프트는 필수예요" },
      { status: 400 }
    );
  }
  if (!getCategories().some((c) => c.slug === categorySlug)) {
    return NextResponse.json({ error: "존재하지 않는 카테고리예요" }, { status: 400 });
  }
  if (!models.some((m) => m.slug === modelSlug)) {
    return NextResponse.json({ error: "존재하지 않는 모델이에요" }, { status: 400 });
  }
  if (mediaType !== "image" && mediaType !== "video") {
    return NextResponse.json({ error: "미디어 타입이 올바르지 않아요" }, { status: 400 });
  }

  const id = randomId();
  let mediaUrl: string | undefined;

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
    const destDir = path.join(process.cwd(), "public", "prompts");
    fs.mkdirSync(destDir, { recursive: true });
    const filename = `${id}.${ext}`;
    fs.writeFileSync(path.join(destDir, filename), Buffer.from(await file.arrayBuffer()));
    mediaUrl = `/prompts/${filename}`;
  }

  const item: PromptItem = {
    id,
    title,
    summary,
    promptText,
    categorySlug,
    modelSlug,
    mediaType,
    aspectRatio: aspectRatio || undefined,
    tags: tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    mediaUrl,
    needsReferencePhoto: needsReferencePhoto || undefined,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  addPrompt(item);

  return NextResponse.json({ id });
}
