import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { readPrompts, updatePromptMedia } from "@/lib/promptsStore";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_SIZE = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const promptId = formData.get("promptId");
  const file = formData.get("file");

  const existing =
    typeof promptId === "string" ? readPrompts().find((p) => p.id === promptId) : undefined;
  if (!existing) {
    return NextResponse.json({ error: "invalid promptId" }, { status: 400 });
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

  const destDir = path.join(process.cwd(), "public", "prompts");
  fs.mkdirSync(destDir, { recursive: true });

  // Next.js 16 blocks query strings on local image src by default, so we
  // bust the cache with a unique filename instead and clean up the old one.
  if (existing.mediaUrl?.startsWith("/prompts/")) {
    fs.rm(path.join(process.cwd(), "public", existing.mediaUrl), { force: true }, () => {});
  }

  const filename = `${existing.id}-${Date.now()}.${ext}`;
  const destPath = path.join(destDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(destPath, buffer);

  const mediaUrl = `/prompts/${filename}`;
  updatePromptMedia(existing.id, mediaUrl);

  return NextResponse.json({ mediaUrl });
}
