import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Channel from "./pages/Channel";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="bg-[#181818] min-h-screen text-white">
        <Navbar setMenuOpen={setMenuOpen} />
        <div className="flex">
          <Menu menuOpen={menuOpen} />
          <div className="flex-[7] bg-[#181818]">
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="explore" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route path="channel/:id" element={<Channel />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;