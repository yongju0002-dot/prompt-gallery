import { ModelInfo } from "@/lib/types";

export const models: ModelInfo[] = [
  { slug: "gpt-image", label: "GPT 이미지", mediaType: "image" },
  { slug: "nano-banana", label: "나노바나나 프로", mediaType: "image" },
  { slug: "midjourney", label: "미드저니", mediaType: "image" },
  { slug: "seedream", label: "씨드림", mediaType: "image" },
  { slug: "seedance", label: "씨댄스", mediaType: "video" },
];

export function getModelBySlug(slug: string): ModelInfo | undefined {
  return models.find((m) => m.slug === slug);
}
