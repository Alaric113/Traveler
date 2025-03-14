import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import ProjectDetail from "./pages/ProjectDetails";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faCog } from "@fortawesome/free-solid-svg-icons";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Explore as ExploreIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme'; // Import your theme

function AppContent() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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
            sx={{ marginLeft: "5px" }}
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
              <Link to="/Traveler" className={location.pathname === "/Traveler" ? "active" : ""}>
                <FontAwesomeIcon icon={faHome} /> 主頁
              </Link>
            </li>
            <li>
              <Link to="/Traveler/explore" className={location.pathname === "/Traveler/explore" ? "active" : ""}>
                <FontAwesomeIcon icon={faCompass} /> 探索
              </Link>
            </li>
            <li>
              <Link to="/Traveler/settings" className={location.pathname === "/Traveler/settings" ? "active" : ""}>
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
            <Route path="/Traveler/projects/:projectId" element={<ProjectDetail  />} />
          </Routes>
        </div>

        <nav className="bottom-navbar">
          <ul>
            <li>
              <Link to="/Traveler/explore" className={location.pathname === "/Traveler/explore" ? "active" : ""}>
                <ExploreIcon />
                <span>探索</span>
              </Link>
            </li>
            <li>
              <Link to="/Traveler" className={location.pathname === "/Traveler" ? "active" : ""}>
                <HomeIcon />
                <span>首頁</span>
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

        {/* Remove Floating Action Button */}

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              padding: '8px',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', paddingBottom: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              {"新增行程"}
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {/* Form fields */}
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: 2, justifyContent: 'space-between' }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="outlined"
              sx={{ borderRadius: '8px', px: 3 }}
            >
              取消
            </Button>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              sx={{ borderRadius: '8px', px: 3, backgroundColor: 'var(--primary-color)' }}
            >
              新增
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;