import Image from "next/image";
import { PromptItem } from "@/lib/types";
import { getCategoryBySlug } from "@/data/categories";

const GRADIENTS = [
  "from-[#4f46e5] to-[#0b0d12]",
  "from-[#06b6d4] to-[#1e1b4b]",
  "from-[#6366f1] to-[#0891b2]",
  "from-[#312e81] to-[#4f46e5]",
  "from-[#155e75] to-[#312e81]",
  "from-[#4338ca] to-[#083344]",
];

function pickGradient(seed: string) {
  const sum = [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return GRADIENTS[sum % GRADIENTS.length];
}

export default function PromptMedia({
  prompt,
  className = "",
}: {
  prompt: PromptItem;
  className?: string;
}) {
  const topLeftBadge = prompt.needsReferencePhoto && (
    <span className="font-mono-accent absolute left-2 top-2 rounded bg-black/40 px-2 py-0.5 text-[10px] text-white">
      사진 업로드
    </span>
  );
  const topRightBadge = prompt.mediaType === "video" && (
    <span className="absolute right-2 top-2 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white">
      영상
    </span>
  );

  if (prompt.mediaUrl) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={prompt.mediaUrl}
          alt={prompt.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
        {topLeftBadge}
        {topRightBadge}
      </div>
    );
  }

  const category = getCategoryBySlug(prompt.categorySlug);
  const gradient = pickGradient(prompt.id);
  const monogram = (category?.label ?? prompt.title).charAt(0);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <span className="font-mono-accent text-3xl font-bold text-white/70">
        {monogram}
      </span>
      {topLeftBadge}
      {topRightBadge}
      <span className="font-mono-accent absolute bottom-2 left-2 rounded bg-black/30 px-2 py-0.5 text-[10px] text-white">
        PREVIEW
      </span>
    </div>
  );
}
