import LeftSidebar from "./components/LeftSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import useIsMobile from "@/hooks/useIsMobile";

const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="h-screen bg-black text-white flex flex-col ">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex flex-1 h-full overflow-hidden p-2"
        >
          {/* left sidebar */}
          <ResizablePanel
            defaultSize={20}
            minSize={isMobile ? 0 : 10}
            maxSize={30}
          >
            <LeftSidebar />
          </ResizablePanel>
          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

          {/* Main content */}
          <ResizablePanel defaultSize={isMobile ? 80 : 60}>
            <Outlet />
          </ResizablePanel>

          {!isMobile && (
            <>
              {/* right sidebar */}
              <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
              <ResizablePanel defaultSize={20} minSize={0} maxSize={25}>
                <FriendsActivity />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
        <PlaybackControls />
      </div>
      <AudioPlayer />
    </>
  );
};

export default MainLayout;
