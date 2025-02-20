import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faCog } from "@fortawesome/free-solid-svg-icons";
import ProjectDetail from "./pages/ProjectDetails"; // 確保路徑正確

// 將 App 內容移到一個新的組件中
function AppContent() {
  const location = useLocation(); // 現在 useLocation 在 <Router> 的上下文中

  return (
    <>
      <div className="header">
        <h1>Traveler</h1>
      </div>
      <div className="app-container">
        {/* 側邊欄 */}
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                <FontAwesomeIcon icon={faHome} /> 主頁
              </Link>
            </li>
            <li>
              <Link to="/explore" className={location.pathname === "/explore" ? "active" : ""}>
                <FontAwesomeIcon icon={faCompass} /> 探索
              </Link>
            </li>
            <li>
              <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
                <FontAwesomeIcon icon={faCog} /> 設定
              </Link>
            </li>
          </ul>
        </nav>

        {/* 頁面內容 */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
          </Routes>
        </div>

        {/* 底部導航欄 */}
        <nav className="bottom-navbar">

          <ul>
          <li>
              <Link to="/explore" className={location.pathname === "/explore" ? "active" : ""}>
                <FontAwesomeIcon icon={faCompass} /> 探索
              </Link>
            </li>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                <FontAwesomeIcon icon={faHome} /> 主頁
              </Link>
            </li>
            
            <li>
              <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
                <FontAwesomeIcon icon={faCog} /> 設定
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

// 主 App 組件
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;