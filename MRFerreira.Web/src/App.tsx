import { Toaster } from "react-hot-toast"
import AppRouter from "./routes"
import "aos/dist/aos.css";

function App() {
  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  )
}

export default App
