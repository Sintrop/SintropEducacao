"use client";

interface Props {
  url: string;
}
export default function PdfView({ url }: Props) {
  return (
    <div className="w-full">
      <iframe src={url} width="100%" height="800px" />
    </div>
  );
}
