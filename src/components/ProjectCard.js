import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSwipeable } from "react-swipeable";
import { ref, remove } from "firebase/database";
import { database } from "../firebase";

const ProjectCard = ({ project }) => {
  const [swiped, setSwiped] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    const projectRef = ref(database, `projects/${project.id}`);
    remove(projectRef)
      .then(() => {
        console.log("Project deleted successfully!");
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error deleting project: ", error);
        setOpenDialog(false);
      });
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === "Left" && eventData.absX > 50) {
        setSwiped(true);
        setShowDelete(true);
      } else if (eventData.dir === "Right" || eventData.absX < 50) {
        setSwiped(false);
        setShowDelete(false);
      }
    },
    onSwiped: (eventData) => {
      if (eventData.dir === "Right") {
        setSwiped(false);
        setShowDelete(false);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      <Card
        {...swipeHandlers}
        sx={{
          transform: swiped ? "translateX(-100px)" : "translateX(0)",
          transition: "transform 0.3s ease",
          borderRadius: "30px",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #999",
          padding: "0",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
        elevation={3}
      >
        <CardContent>
          <Link to={`/Traveler/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="h3" fontWeight="bold">
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`開始日期: ${new Date(project.startDate).toLocaleDateString()} , 結束日期: ${new Date(
                project.endDate
              ).toLocaleDateString()}`}
            </Typography>
          </Link>
          {showDelete && (
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute", right: "10px", top: "10px" }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <Typography>確定要刪除 {project.name} 嗎？</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            取消
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectCard;