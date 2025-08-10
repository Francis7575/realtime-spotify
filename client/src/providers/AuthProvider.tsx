import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

// Helper: Wait until backend responds
const waitForBackend = async () => {
  let isReady = false;
  let attempts = 0;

  while (!isReady && attempts < 20) { // retry up to 20 times (about 1 min)
    try {
      await axiosInstance.get("/health");
      isReady = true;
    } catch {
      await new Promise(res => setTimeout(res, 3000)); // wait 3s before retry
      attempts++;
    }
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      try {
        const token = await getToken();

        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
        }
        await waitForBackend();

        // init socket
        if (userId) initSocket(userId);
      } catch (error: unknown) {
        updateApiToken(null);
        console.log("Error in auth provider", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    initAuth();

    // clean up
    return () => {
      isMounted = false;
      disconnectSocket();
    };
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
        <Loader className="size-16 text-emerald-500 animate-spin" />
        <p className="uppercase text-lg font-bold text-center px-6">
          The server may take up to 50 seconds to become active. Thank you for your
          patience.
        </p>
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
