import { Song } from "@/types/types";
import PlayButton from "./PlayButton";
import ShowAllDialog from "./ShowAllDialog";

type SectionGridProps = {
  dialogTitle: string;
  dialogDescription: string;
  title: string;
  songs: Song[];
  fetchType: "trending" | "madeForYou";
};

const SectionGrid = ({
  songs,
  title,
  dialogTitle,
  dialogDescription,
  fetchType,
}: SectionGridProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <ShowAllDialog
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
          fetchType={fetchType}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.isArray(songs) &&
          songs.map((song) => (
            <div
              key={song._id}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105"
                  />
                </div>
                <PlayButton song={song} />
              </div>
              <h3 className="font-medium mb-2 truncate">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SectionGrid;
