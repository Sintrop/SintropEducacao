"use client";

import { ContentProps } from "@/domain/Content/types";

interface Props {
  content: ContentProps;
}
export function Youtube({ content }: Props) {
  return (
    <div className="w-full h-full">
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
