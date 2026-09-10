import fs from "fs";
import path from "path";
import { PromptItem } from "./types";

const STORE_PATH = path.join(process.cwd(), "src/data/prompts-data.json");

export function readPrompts(): PromptItem[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as PromptItem[];
  } catch {
    return [];
  }
}

function writePrompts(items: PromptItem[]) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2) + "\n");
}

export function addPrompt(item: PromptItem) {
  const items = readPrompts();
  items.unshift(item);
  writePrompts(items);
}

export function updatePromptMedia(id: string, mediaUrl: string) {
  const items = readPrompts();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return;
  items[idx] = { ...items[idx], mediaUrl };
  writePrompts(items);
}

export function deletePrompt(id: string) {
  writePrompts(readPrompts().filter((p) => p.id !== id));
}
