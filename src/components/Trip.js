import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fab,
  Box,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Map as MapIcon,
} from "@mui/icons-material";
import { ref, onValue, push, update, remove } from "firebase/database";
import { database } from "../firebase";

const Trip = ({ projectId, date }) => {
  const [trips, setTrips] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editTrip, setEditTrip] = useState(null);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [cost, setCost] = useState("");
  const [stay, setStay] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["娛樂", "食物", "住宿", "交通", "其他"];

  useEffect(() => {
    const tripsRef = ref(database, `projects/${projectId}/trips/${date.toISOString().split("T")[0]}`);
    onValue(tripsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let tripsArray = Object.entries(data).map(([id, trip]) => ({ id, ...trip }));
        tripsArray.sort((a, b) => a.time.localeCompare(b.time));
        setTrips(tripsArray);
      } else {
        setTrips([]);
      }
    });
  }, [projectId, date]);

  const handleOpenDialog = (trip = null) => {
    setEditTrip(trip);
    setName(trip ? trip.name : "");
    setTime(trip ? trip.time : "");
    setCost(trip ? trip.cost : "");
    setStay(trip ? trip.stay : "");
    setAddress(trip ? trip.address : "");
    setCategory(trip ? trip.category : "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const tripsRef = ref(database, `projects/${projectId}/trips/${date.toISOString().split("T")[0]}`);
    if (editTrip) {
      update(ref(database, `projects/${projectId}/trips/${date.toISOString().split("T")[0]}/${editTrip.id}`), {
        name,
        time,
        cost,
        stay,
        address,
        category,
      });
    } else {
      push(tripsRef, { name, time, cost, stay, address, category });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    remove(ref(database, `projects/${projectId}/trips/${date.toISOString().split("T")[0]}/${id}`));
  };

  const handleOpenMap = (address) => {
    if (!address) {
      return;
    }
    window.open(address);
  };

  return (
    <div>
      <Grid container spacing={1} >
        {trips.map((trip) => {
          let endTime = null;
          if (trip.stay) {
            const startTimeParts = trip.time.split(":");
            const stayMinutes = parseInt(trip.stay);
            let endMinutes = parseInt(startTimeParts[1]) + stayMinutes;
            let endHours = parseInt(startTimeParts[0]) + Math.floor(endMinutes / 60);
            endMinutes = endMinutes % 60;
            endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
          }
          return (
            <Grid item xs={12} key={trip.id}>
              <Card onClick={() => handleOpenMap(trip.address)} sx={{ background: "#69d2e7", p: 0, borderRadius: "30px", position: "relative", width: "100%" }}>
                <CardContent sx={{overflowY:"scroll",maxHeight:"100%"}}> {/* 添加 overflowY 和 maxHeight */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton color="black" aria-label="Google Maps" disabled={!trip.address}>
                          <MapIcon />
                        </IconButton>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", ml: 1 }}>
                          <Typography variant="body2">{trip.time}</Typography>
                          <Typography variant="body2">|</Typography>
                          <Typography variant="body2">{endTime}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", ml: 1 }}>
                        <Typography variant="h6" component="h3" fontWeight="bold">
                          {trip.name}
                        </Typography>
                        <Typography variant="body2">
                          平均消費/人: {trip.cost}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(trip)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(trip.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => handleOpenDialog()}
      >
        <AddIcon />
      </Fab>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editTrip ? "編輯行程" : "新增行程"}</DialogTitle>
        <DialogContent>
          <TextField label="名稱" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required />
          <TextField
            label="時間"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            margin="normal"
            type="time"
            inputProps={{ step: 300 }}
          />
          <TextField label="平均花費" value={cost} onChange={(e) => setCost(e.target.value)} fullWidth margin="normal" />
          <Select
            label="分類"
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="停留時間 (分鐘)"
            value={stay}
            onChange={(e) => setStay(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ min: 0, step: 1 }}
          />
          <TextField label="Google Map 地址" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit}>{editTrip ? "更新" : "新增"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Trip;