import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formateCuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};
const VIEW_FORMATER = Intl.NumberFormat(undefined, {
  notation: "compact",
});
export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideopPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) {
      return;
    }

    if (isVideopPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideopPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => {
        setIsVideoPlaying(true);
      }}
      onMouseLeave={() => {
        setIsVideoPlaying(false);
      }}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] ${
            isVideopPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          ref={videoRef}
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideopPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          muted
          playsInline
          src={videoUrl}
        />
      </a>
      <div className=" flex gap-4">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel?.profileUrl}
            className="rounded-full border-2 w-12 h-12"
          />
        </a>
        <div className="flex flex-col ">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
