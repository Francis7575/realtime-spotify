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
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const AlbumsTable = () => {
  const { albums, deleteAlbum, fetchAlbums } = useMusicStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedAlbumTitle, setSelectedAlbumTitle] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const handleOpenModal = (albumId: string, albumTitle: string) => {
    setSelectedAlbumId(albumId);
    setSelectedAlbumTitle(albumTitle);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedAlbumId) {
      deleteAlbum(selectedAlbumId);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead className="w-16">Image</TableHead>
            <TableHead className="w-32">Title</TableHead>
            <TableHead className="w-32">Artist</TableHead>
            <TableHead className="w-32">Release Year</TableHead>
            <TableHead className="w-32">Songs</TableHead>
            <TableHead className="text-right w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow key={album._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="w-10 h-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{album.title}</TableCell>
              <TableCell>{album.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {album.releaseYear}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Music className="h-4 w-4" />
                  {album.songs.length} songs
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenModal(album._id, album.title)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
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
          deleteName={selectedAlbumTitle}
          deleteType={"Album"}
        />
      )}
    </>
  );
};
export default AlbumsTable;
