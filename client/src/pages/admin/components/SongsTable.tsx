import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";
import { useState } from "react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);
  const [selectedSongTitle, setSelectedSongTitle] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  const handleOpenModal = (songId: string, songTitle: string) => {
    setSelectedSongId(songId);
    setSelectedSongTitle(songTitle);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedSongId) {
      deleteSong(selectedSongId);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="size-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => handleOpenModal(song._id, song.title)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <DeleteModal
          onDelete={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          deleteName={selectedSongTitle}
        />
      )}
    </>
  );
};
export default SongsTable;
