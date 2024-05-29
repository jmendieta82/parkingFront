import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageHome from "./pages/PageHome.tsx";
import PageParking from "./pages/PageParking.tsx";
import PageConfig from "./pages/PageConfig.tsx";
import PageProfile from "./pages/PageProfile.tsx";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/parqueadero" element={<PageParking />} />
        <Route path="/settings" element={<PageConfig />} />
        <Route path="/profile" element={<PageProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
