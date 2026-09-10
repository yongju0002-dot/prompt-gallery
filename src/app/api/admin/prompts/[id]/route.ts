import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { deletePrompt, readPrompts } from "@/lib/promptsStore";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = readPrompts().find((p) => p.id === id);

  if (existing?.mediaUrl?.startsWith("/prompts/")) {
    const filePath = path.join(process.cwd(), "public", existing.mediaUrl);
    fs.rm(filePath, { force: true }, () => {});
  }

  deletePrompt(id);
  return NextResponse.json({ ok: true });
}
