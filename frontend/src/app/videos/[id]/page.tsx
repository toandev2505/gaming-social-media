import { Suspense } from "react";
import { VideoDetailView } from "@/modules/videos/views/VideoDetailView";

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

async function VideoDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VideoDetailView videoId={id} />;
}

export default function VideoDetailPage({ params }: VideoDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] text-zinc-400 p-8 text-sm">
          Đang tải trang video...
        </div>
      }
    >
      <VideoDetailContent params={params} />
    </Suspense>
  );
}