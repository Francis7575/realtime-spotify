import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      // start playing the album from the beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-full w-full custom-scrollbar">
      <div className="h-full rounded-md overflow-y-auto overflow-x-hidden ">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none min-h-full "
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* play button */}
          <div className="px-6 pb-4 flex items-center gap-6 relative">
            <Button
              onClick={handlePlayAlbum}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all"
            >
              {isPlaying &&
              currentAlbum?.songs.some(
                (song) => song._id === currentSong?._id
              ) ? (
                <Pause className="h-7 w-7 text-black" />
              ) : (
                <Play className="h-7 w-7 text-black" />
              )}
            </Button>
          </div>

          {/* songs list */}
          <div className="px-6">
            <div className="overflow-x-auto">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow className="hover:bg-zinc-800/50 ">
                    <TableHead className="w-12 md:w-4 text-center">#</TableHead>
                    <TableHead className="w-40 md:w-42">Title</TableHead>
                    <TableHead className="w-40 md:w-42">
                      Released Date
                    </TableHead>
                    <TableHead className="w-20 md:w-12 text-right">
                      <Clock className="size-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <TableRow
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className="cursor-pointer group"
                      >
                        <TableCell>
                          <div className="flex items-center justify-center py-4">
                            {isCurrentSong && isPlaying ? (
                              <div className="size-4 text-green-500">♫</div>
                            ) : (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && (
                              <Play className="h-4 w-4 hidden group-hover:block" />
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3 py-4">
                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-10"
                            />
                            <div>
                              <div className="font-medium text-white">
                                {song.title}
                              </div>
                              <div>{song.artist}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>{song.createdAt.split("T")[0]}</TableCell>

                        <TableCell>{formatDuration(song.duration)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
