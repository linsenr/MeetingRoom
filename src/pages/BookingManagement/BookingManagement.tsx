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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { mockBookings } from "../../mock/bookingData";
import { mockRooms } from "../../mock/roomData";
import { mockUsers } from "../../mock/userData";
import { Booking } from "../../types/booking";

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editForm, setEditForm] = useState<Partial<Booking>>({});

  const handleAdd = () => {
    setSelectedBooking(null);
    setEditForm({});
    setOpen(true);
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditForm(booking);
    setOpen(true);
  };

  const handleDelete = (bookingId: string) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (selectedBooking) {
      setBookings(
        bookings.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, ...editForm }
            : booking
        )
      );
    } else {
      const newBooking: Booking = {
        ...(editForm as Booking),
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        status: "pending",
        attendees: editForm.attendees || [],
      };
      setBookings([...bookings, newBooking]);
    }
    handleClose();
  };

  const handleFormChange = (field: keyof Booking, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getRoomName = (roomId: string) => {
    return mockRooms.find((room) => room.id === roomId)?.name || "未知会议室";
  };

  const getUserName = (userId: string) => {
    return mockUsers.find((user) => user.id === userId)?.name || "未知用户";
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "待审批",
      approved: "已通过",
      rejected: "已拒绝",
      cancelled: "已取消",
    };
    return statusMap[status] || status;
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="搜索预约"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          新建预约
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>会议主题</TableCell>
              <TableCell>会议室</TableCell>
              <TableCell>预约人</TableCell>
              <TableCell>开始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.title}</TableCell>
                <TableCell>{getRoomName(booking.roomId)}</TableCell>
                <TableCell>{getUserName(booking.userId)}</TableCell>
                <TableCell>
                  {new Date(booking.startTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.endTime).toLocaleString()}
                </TableCell>
                <TableCell>{getStatusText(booking.status)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(booking)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(booking.id)}
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
        <DialogTitle>{selectedBooking ? "编辑预约" : "新建预约"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="会议主题"
              fullWidth
              value={editForm.title || ""}
              onChange={(e) => handleFormChange("title", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>会议室</InputLabel>
              <Select
                value={editForm.roomId || ""}
                label="会议室"
                onChange={(e) => handleFormChange("roomId", e.target.value)}
              >
                {mockRooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="开始时间"
              type="datetime-local"
              fullWidth
              value={editForm.startTime || ""}
              onChange={(e) => handleFormChange("startTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="结束时间"
              type="datetime-local"
              fullWidth
              value={editForm.endTime || ""}
              onChange={(e) => handleFormChange("endTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
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

export default BookingManagement;
