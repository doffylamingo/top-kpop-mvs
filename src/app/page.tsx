import Image from "next/image";
import Link from "next/link";

export interface Videos {
  taskId: number;
  url: string;
  songName: string;
  artists: string;
  playCount: number;
  incCount: number;
  orderNo: number;
  orderDiff: number;
  peakPosition: number;
  thumbnailUrl: string;
  backgroundUrl: string;
  publishTime: string;
  prevIncCount: number;
}

const getMVRanks = async () => {
  const response = await fetch(
    "https://api.kpop-radar.com/youtube/realtimeData",
    {
      cache: "no-store",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: `sortType=2&orderCountInPage=50&lastOrderNo=0`,
      method: "POST",
    },
  );
  const videos: Videos[] = (await response.json()).body.tasks;

  return videos;
};

export default async function Home() {
  const videos = await getMVRanks();

  return (
    <div className="max-w-lg md:max-w-3xl md:max-w-5xl pt-4 flex flex-col items-center mx-auto overflow-x-hidden">
      {videos.map((video) => (
        <Link
          key={video.taskId}
          href={video.url}
          target="__blank"
          className="flex py-8 items-center justify-center gap-x-8 border-b border-gray-500 hover:scale-110 ease-in-out duration-500 transition"
        >
          <div className="flex items-center">
            <span className="font-extrabold text-2xl px-4 md:px-8 text-gray-900 text-white">
              {video.orderNo}.
            </span>
            <div className="w-20 h-20 md:w-44 md:h-44 relative">
              <Image
                className="rounded-full object-cover outline outline-offset-4 outline-1 outline-red-600"
                alt={video.songName}
                src={video.backgroundUrl}
                priority
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
            </div>
          </div>
          <div className="flex flex-col w-44 md:w-96 block">
            <p className="text-2xl md:text-3xl font-bold truncate overflow-hidden text-white">
              {video.songName}
            </p>
            <p className="text-xl font-medium text-gray-subtitle">
              {video.artists.split("|")[2]}
            </p>
            <p className="text-red-500 font-medium pt-1 md:pt-3">
              <span className="font-extrabold">
                {`${video.playCount.toLocaleString()} `}
              </span>
              views
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
