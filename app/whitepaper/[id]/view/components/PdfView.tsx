"use client";

interface Props {
  url: string;
}
export function PdfView({ url }: Props) {
  return (
    <div className="w-full h-full">
      <iframe src={url} width="100%" height="100%" />
    </div>
  );
}
