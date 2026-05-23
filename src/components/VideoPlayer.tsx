interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}

function getYouTubeEmbedUrl(src: string) {
  let parsed: URL;

  try {
    parsed = new URL(src);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace("www.", "");
  const isYouTube = host === "youtube.com" || host === "youtu.be";

  if (!isYouTube) return null;

  const videoId =
    host === "youtu.be"
      ? parsed.pathname.slice(1)
      : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export function VideoPlayer({ src, title = "Video player", poster, className = "" }: VideoPlayerProps) {
  const youtubeEmbedUrl = getYouTubeEmbedUrl(src);

  if (youtubeEmbedUrl) {
    return (
      <div className={`relative aspect-video w-full ${className}`}>
        <iframe
          className="h-full w-full rounded-xl border-0 bg-background"
          src={youtubeEmbedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full ${className}`}>
      <video
        className="h-full w-full rounded-xl bg-background object-cover"
        src={src}
        poster={poster}
        title={title}
        controls
        preload="metadata"
      />
    </div>
  );
}
