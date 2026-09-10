import { PromptItem } from "@/lib/types";
import { readPrompts } from "@/lib/promptsStore";

/**
 * 프롬프트 데이터는 src/data/prompts-data.json에 저장되며, 관리자 페이지(/admin)에서
 * 생성/삭제됨. 이 파일은 그 저장소를 읽는 조회 헬퍼만 제공함.
 */
export function getAllPrompts(): PromptItem[] {
  return readPrompts();
}

export function getPromptById(id: string): PromptItem | undefined {
  return getAllPrompts().find((p) => p.id === id);
}

export function getPromptsByCategory(categorySlug: string): PromptItem[] {
  return getAllPrompts().filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedPrompts(current: PromptItem, limit = 4): PromptItem[] {
  return getAllPrompts()
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.categorySlug === current.categorySlug || p.modelSlug === current.modelSlug)
    )
    .slice(0, limit);
}

export function getLatestPrompts(limit = 8): PromptItem[] {
  return [...getAllPrompts()]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}
