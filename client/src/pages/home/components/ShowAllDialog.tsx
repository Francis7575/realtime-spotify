import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types/types";
import { useEffect, useState } from "react";
import PlayButton from "./PlayButton";

type ShowAllDialogProps = {
  dialogTitle: string;
  dialogDescription: string;
  fetchType: string;
};

const ShowAllDialog = ({
  dialogTitle,
  dialogDescription,
  fetchType,
}: ShowAllDialogProps) => {
  const {
    allTrendingSongs,
    allMadeForYouSongs,
    fetchAllTrendingSongs,
    fetchAllMadeForYouSongs,
  } = useMusicStore();
  const [songs, setSongs] = useState<Song[]>([]);
  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchAllTrendingSongs();
    fetchAllMadeForYouSongs();
  }, [fetchAllTrendingSongs, fetchAllMadeForYouSongs]);

  useEffect(() => {
    if (allMadeForYouSongs.length > 0 && allTrendingSongs.length > 0) {
      const allSongs = [...allTrendingSongs, ...allMadeForYouSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, allMadeForYouSongs, allTrendingSongs]);

  const handleDialogOpen = async (isOpen: boolean) => {
    if (isOpen) {
      if (fetchType === "trending") {
        const trendingSongs = await fetchAllTrendingSongs();
        setSongs(trendingSongs);
      } else if (fetchType === "madeForYou") {
        const madeForYouSongs = await fetchAllMadeForYouSongs();
        setSongs(madeForYouSongs);
      }
    } else {
      setSongs([]); // Clear songs when dialog is closed
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Show all
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] md:max-w-lg overflow-auto	max-h-[80vh]">
        <DialogHeader className="flex flex-col items-center mb-4">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="px-8 text-center">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        {songs.length === 0 ? (
          <p className="text-sm text-zinc-400">Loading songs...</p>
        ) : (
          <div className="grid grid-cols-2 gap-y-[1.8rem] gap-x-[2.2rem]">
            {songs.map((song) => (
              <div className="relative h-full w-full group cursor-pointer hover:bg-zinc-700/40 p-4 rounded-md transition-all">
                <div className="aspect-square rounded-md  shadow-lg overflow-hidden">
                  <img
                    key={song._id}
                    src={song.imageUrl}
                    alt={song.title}
                    className="h-full w-full group-hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <p className="font-bold">{song.title}</p>
                  <span>{song.artist}</span>
                </div>
                <PlayButton song={song} />
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowAllDialog;
