import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const SongsTabContent = () => {
  const { fetchSongs } = useMusicStore();
  
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="mr-4">
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </CardTitle>
            <CardDescription className="mt-2">Manage your music tracks</CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};
export default SongsTabContent;
