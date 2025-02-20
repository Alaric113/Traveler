// ProjectCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ref, remove } from "firebase/database";
import { database } from "../firebase";

const ProjectCard = ({ project }) => {
  const [swiped, setSwiped] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // 新增彈出視窗狀態

  const handleDelete = () => {
    setOpenDialog(true); // 開啟彈出視窗
  };

  const confirmDelete = () => {
    const projectRef = ref(database, `projects/${project.id}`);
    remove(projectRef)
      .then(() => {
        console.log("Project deleted successfully!");
        setOpenDialog(false); // 關閉彈出視窗
      })
      .catch((error) => {
        console.error("Error deleting project: ", error);
        setOpenDialog(false); // 關閉彈出視窗
      });
  };

  const cancelDelete = () => {
    setOpenDialog(false); // 關閉彈出視窗
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
      <ListItem
        {...swipeHandlers}
        style={{
          transform: swiped ? "translateX(-100px)" : "translateX(0)",
          transition: "transform 0.3s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Link to={`/projects/${project.id}`}>
          <ListItemText
            primary={
              <Typography variant="h6" component="h3" fontWeight="bold">
                {project.name}
              </Typography>
            }
            secondary={`開始日期: ${new Date(project.startDate).toLocaleDateString()} , 結束日期: ${new Date(
              project.endDate
            ).toLocaleDateString()}`}
          />
        </Link>
        {showDelete && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete} // 修改 onClick 事件
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
          >
            刪除
          </Button>
        )}
      </ListItem>

      <Dialog open={openDialog} onClose={cancelDelete}> {/* 新增彈出視窗 */}
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