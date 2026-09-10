import fs from "fs";
import path from "path";
import { Category } from "./types";

const STORE_PATH = path.join(process.cwd(), "src/data/categories-data.json");

export function readCategories(): Category[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Category[];
  } catch {
    return [];
  }
}

function writeCategories(items: Category[]) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2) + "\n");
}

export function addCategory(item: Category) {
  const items = readCategories();
  items.push(item);
  writeCategories(items);
}

export function updateCategoryImage(slug: string, coverImage: string) {
  const items = readCategories();
  const idx = items.findIndex((c) => c.slug === slug);
  if (idx === -1) return;
  items[idx] = { ...items[idx], coverImage };
  writeCategories(items);
}

export function deleteCategory(slug: string) {
  writeCategories(readCategories().filter((c) => c.slug !== slug));
}
