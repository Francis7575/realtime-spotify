import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const Homepage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md h-screen bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold mb-6">
            Your Soundtrack, Your World✨
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              dialogTitle="These songs are all made for you✨"
              dialogDescription="A curated playlist just for you. Discover songs that match your taste!"
              fetchType="madeForYou"
              songs={madeForYouSongs}
            />
            <SectionGrid
              title="Trending"
              dialogTitle="These are trending songs📈"
              dialogDescription="Explore the most popular songs right now. Stay updated with the latest hits!"
              fetchType="trending"
              songs={trendingSongs}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default Homepage;
