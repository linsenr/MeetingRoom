import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { mockBookings } from "../../mock/bookingData";
import { mockRooms } from "../../mock/roomData";
import { mockUsers } from "../../mock/userData";
import { Booking } from "../../types/booking";
import { BookingManageFilters } from "../../types/bookingManage";

const BookingManage = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<BookingManageFilters>({
    status: "all",
    roomId: "",
    dateRange: {
      start: "",
      end: "",
    },
  });

  const handleStatusChange = (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const getStatusChipColor = (
    status: string
  ): "default" | "primary" | "error" | "warning" => {
    const colorMap: {
      [key: string]: "default" | "primary" | "error" | "warning";
    } = {
      pending: "warning",
      approved: "primary",
      rejected: "error",
      cancelled: "default",
    };
    return colorMap[status] || "default";
  };

  const filteredBookings = bookings.filter((booking) => {
    let matches = true;

    // 搜索词过滤
    if (searchTerm) {
      matches =
        matches &&
        (booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getUserName(booking.userId)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
    }

    // 状态过滤
    if (filters.status && filters.status !== "all") {
      matches = matches && booking.status === filters.status;
    }

    // 会议室过滤
    if (filters.roomId) {
      matches = matches && booking.roomId === filters.roomId;
    }

    // 日期范围过滤
    if (filters.dateRange.start && filters.dateRange.end) {
      const bookingDate = new Date(booking.startTime);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      matches = matches && bookingDate >= startDate && bookingDate <= endDate;
    }

    return matches;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="搜索预约..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "action.active", mr: 1 }} />
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setFilterDialogOpen(true)}
          >
            筛选
          </Button>
        </Stack>
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
                <TableCell>
                  <Chip
                    label={getStatusText(booking.status)}
                    color={getStatusChipColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {booking.status === "pending" && (
                    <>
                      <IconButton
                        onClick={() =>
                          handleStatusChange(booking.id, "approved")
                        }
                        color="primary"
                        size="small"
                      >
                        <ApproveIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleStatusChange(booking.id, "rejected")
                        }
                        color="error"
                        size="small"
                      >
                        <RejectIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
      >
        <DialogTitle>筛选条件</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 2,
              minWidth: 300,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>状态</InputLabel>
              <Select
                value={filters.status || "all"}
                label="状态"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value as
                      | "all"
                      | "pending"
                      | "approved"
                      | "rejected"
                      | "cancelled",
                  })
                }
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="pending">待审批</MenuItem>
                <MenuItem value="approved">已通过</MenuItem>
                <MenuItem value="rejected">已拒绝</MenuItem>
                <MenuItem value="cancelled">已取消</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>会议室</InputLabel>
              <Select
                value={filters.roomId || ""}
                label="会议室"
                onChange={(e) =>
                  setFilters({ ...filters, roomId: e.target.value })
                }
              >
                <MenuItem value="">全部</MenuItem>
                {mockRooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="开始日期"
              type="date"
              fullWidth
              value={filters.dateRange.start || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value },
                })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="结束日期"
              type="date"
              fullWidth
              value={filters.dateRange.end || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value },
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>取消</Button>
          <Button
            onClick={() => {
              setFilterDialogOpen(false);
            }}
            variant="contained"
          >
            应用
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingManage;
