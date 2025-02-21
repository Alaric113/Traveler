import React, { useEffect, useState } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import { database } from "../firebase";
import { List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const Wishlist = ({ projectId }) => {
  const [wishes, setWishes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editWish, setEditWish] = useState(null);
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    const wishesRef = ref(database, `projects/${projectId}/wishes`);
    onValue(wishesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWishes(Object.entries(data).map(([id, wish]) => ({ id, ...wish })));
      } else {
        setWishes([]);
      }
    });
  }, [projectId]);

  const handleOpenDialog = (wish = null) => {
    setEditWish(wish);
    setTitle(wish ? wish.title : "");
    setCost(wish ? wish.cost : "");
    setDescription(wish ? wish.description : "");
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
        // 顯示錯誤訊息或阻止提交
        alert("標題不能為空"); // 使用 alert 顯示錯誤訊息
        return; // 阻止提交
      } else {
        setTitleError(""); // 清除錯誤訊息
      }

    const wishesRef = ref(database, `projects/${projectId}/wishes`);
    if (editWish) {
      update(ref(database, `projects/${projectId}/wishes/${editWish.id}`), { title, description, cost });
    } else {
      push(wishesRef, { title, description, cost });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    remove(ref(database, `projects/${projectId}/wishes/${id}`));
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenDialog()}>新增願望</Button>
      <List>
        {wishes.map((wish) => (
          <ListItem key={wish.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(wish)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(wish.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={wish.title} secondary={wish.description} />
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editWish ? "編輯願望" : "新增願望"}</DialogTitle>
        <DialogContent>
          <TextField label="標題" value={title} onChange={(e) => {setTitle(e.target.value);setTitleError("");}} fullWidth margin="normal" required error={!!titleError} // 根據 titleError 狀態顯示錯誤
        helperText={titleError}/>
          <TextField label="平均消費/人" value={cost} onChange={(e) => setCost(e.target.value)} fullWidth margin="normal" type="number" />
          <TextField label="描述" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit}>{editWish ? "更新" : "新增"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Wishlist;