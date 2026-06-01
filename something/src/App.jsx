import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Artist from "./pages/artist";
import New from "./pages/new";
import Trending from "./pages/Trending";
import Playlist from "./pages/playlist";
import Player from "./components/player";
import LoginSignup from "./pages/LoginSignup";
import Genre from "./pages/Genre";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Navbar loggedInUser={loggedInUser} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar loggedInUser={loggedInUser} />
          <div className="flex-1 pt-16 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/new" element={<New />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/genre" element={<Genre />} />
              <Route
                path="/login"
                element={<LoginSignup setLoggedInUser={setLoggedInUser} />}
              />
            </Routes>
          </div>
        </div>
        <Player />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
