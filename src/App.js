import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faCog } from "@fortawesome/free-solid-svg-icons";
import ProjectDetail from "./pages/ProjectDetails";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function AppContent() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
        
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ marginLeft: "5px"}}
            id="menuicon"
          >
            <MenuIcon />
          </IconButton>
          <h1>Traveler</h1>
        </div>
      </div>
      <div className="app-container">
        <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <ul>
            <li>
              <Link to="/Traveler" className={location.pathname === "/" ? "active" : ""}>
                <FontAwesomeIcon icon={faHome} /> 主頁
              </Link>
            </li>
            <li>
              <Link to="/Traveler/explore" className={location.pathname === "/explore" ? "active" : ""}>
                <FontAwesomeIcon icon={faCompass} /> 探索
              </Link>
            </li>
            <li>
              <Link to="/Traveler/settings" className={location.pathname === "/settings" ? "active" : ""}>
                <FontAwesomeIcon icon={faCog} /> 設定
              </Link>
            </li>
          </ul>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/Traveler" element={<Home />} />
            <Route path="/Traveler/explore" element={<Explore />} />
            <Route path="/Traveler/settings" element={<Settings />} />
            <Route path="/Traveler/projects/:projectId" element={<ProjectDetail />} />
          </Routes>
        </div>

        <nav className="bottom-navbar">
  <ul>
    <li>
      <Link to="/Traveler" className={location.pathname === "/Traveler" ? "active" : ""}>
        <HomeIcon />
        <span>首頁</span>
      </Link>
    </li>
    <li>
      <Link to="/Traveler/explore" className={location.pathname === "/Traveler/explore" ? "active" : ""}>
        <ExploreIcon />
        <span>探索</span>
      </Link>
    </li>
    
    <li>
      <Link to="/Traveler/settings" className={location.pathname === "/Traveler/settings" ? "active" : ""}>
        <SettingsIcon />
        <span>設定</span>
      </Link>
    </li>
  </ul>
</nav>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;