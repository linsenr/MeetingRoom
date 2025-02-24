import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { mockRooms } from "../../mock/roomData";
import { Room } from "../../types/room";

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editForm, setEditForm] = useState<Partial<Room>>({});

  const handleAdd = () => {
    setSelectedRoom(null);
    setEditForm({});
    setOpen(true);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setEditForm(room);
    setOpen(true);
  };

  const handleDelete = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (selectedRoom) {
      setRooms(
        rooms.map((room) =>
          room.id === selectedRoom.id ? { ...room, ...editForm } : room
        )
      );
    } else {
      const newRoom: Room = {
        ...(editForm as Room),
        id: String(Date.now()),
        facilities: editForm.facilities || [],
      };
      setRooms([...rooms, newRoom]);
    }
    handleClose();
  };

  const handleFormChange = (field: keyof Room, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="搜索会议室"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          添加会议室
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>容量</TableCell>
              <TableCell>位置</TableCell>
              <TableCell>设施</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.capacity}人</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>
                  {room.facilities.map((facility, index) => (
                    <Chip
                      key={index}
                      label={facility}
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  {room.status === "available" ? "可用" : "维护中"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(room)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(room.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedRoom ? "编辑会议室" : "添加会议室"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="名称"
              fullWidth
              value={editForm.name || ""}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
            <TextField
              label="容量"
              type="number"
              fullWidth
              value={editForm.capacity || ""}
              onChange={(e) =>
                handleFormChange("capacity", Number(e.target.value))
              }
            />
            <TextField
              label="位置"
              fullWidth
              value={editForm.location || ""}
              onChange={(e) => handleFormChange("location", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>状态</InputLabel>
              <Select
                value={editForm.status || ""}
                label="状态"
                onChange={(e) => handleFormChange("status", e.target.value)}
              >
                <MenuItem value="available">可用</MenuItem>
                <MenuItem value="maintenance">维护中</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="描述"
              fullWidth
              multiline
              rows={3}
              value={editForm.description || ""}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomManagement;
