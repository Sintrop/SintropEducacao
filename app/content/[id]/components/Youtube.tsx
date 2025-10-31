import { ContentProps } from "@/domain/Content/types";

interface Props {
  content: ContentProps;
}
export function Youtube({ content }: Props) {
  return (
    <div className="w-full max-w-[1024px] h-full max-h-[512px]">
      <iframe
        width="100%"
        height="100%"
        src={content.url}
        allowFullScreen
        title={content.title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
