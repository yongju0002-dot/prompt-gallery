export type MediaType = "image" | "video";

export interface PromptItem {
  id: string;
  title: string;
  /** 카드/목록에 보여줄 한 줄 요약 */
  summary: string;
  /** 네거티브까지 포함해 모델에 그대로 붙여넣는 전체 프롬프트 */
  promptText: string;
  categorySlug: string;
  modelSlug: string;
  mediaType: MediaType;
  aspectRatio?: string;
  tags?: string[];
  /** 실제 생성 결과 이미지/영상 URL. 없으면 카드에서 플레이스홀더로 대체됨 */
  mediaUrl?: string;
  /** true면 사용자가 자신의 사진을 올려야 동작하는 img2img형 프롬프트 */
  needsReferencePhoto?: boolean;
  promptCount?: number;
  createdAt: string;
}

export interface Category {
  slug: string;
  label: string;
  /** 관리자가 직접 지정한 대표 이미지. 없으면 카드에서 플레이스홀더로 대체됨 */
  coverImage?: string;
}

export interface ModelInfo {
  slug: string;
  label: string;
  mediaType: MediaType;
}
