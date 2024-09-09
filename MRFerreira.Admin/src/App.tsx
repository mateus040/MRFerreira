import { Toaster } from "react-hot-toast";
import AppRouter from "./routes";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRouter />
    </>
  );
}

export default App;
