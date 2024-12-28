import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
};

export default App;
