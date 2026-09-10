import { Category } from "@/lib/types";
import { readCategories } from "@/lib/categoriesStore";

/**
 * 카테고리는 src/data/categories-data.json에 저장되며, 관리자 페이지(/admin)에서
 * 생성/삭제/이미지 변경됨. 이 파일은 그 저장소를 읽는 조회 헬퍼만 제공함.
 */
export function getCategories(): Category[] {
  return readCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}
