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
import { mockUsers } from "../../mock/userData";
import { User } from "../../types/user";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const handleAdd = () => {
    setSelectedUser(null);
    setEditForm({});
    setOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm(user);
    setOpen(true);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (selectedUser) {
      // 编辑现有用户
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...editForm } : user
        )
      );
    } else {
      // 添加新用户
      const newUser: User = {
        ...(editForm as User),
        id: String(Date.now()),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
    }
    handleClose();
  };

  const handleFormChange = (field: keyof User, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="搜索用户"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          添加用户
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>邮箱</TableCell>
              <TableCell>部门</TableCell>
              <TableCell>角色</TableCell>
              <TableCell>电话</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  {user.role === "admin" ? "管理员" : "用户"}
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {user.status === "active" ? "在职" : "离职"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
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
        <DialogTitle>{selectedUser ? "编辑用户" : "添加用户"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="姓名"
              fullWidth
              value={editForm.name || ""}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
            <TextField
              label="邮箱"
              fullWidth
              value={editForm.email || ""}
              onChange={(e) => handleFormChange("email", e.target.value)}
            />
            <TextField
              label="部门"
              fullWidth
              value={editForm.department || ""}
              onChange={(e) => handleFormChange("department", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>角色</InputLabel>
              <Select
                value={editForm.role || ""}
                label="角色"
                onChange={(e) => handleFormChange("role", e.target.value)}
              >
                <MenuItem value="admin">管理员</MenuItem>
                <MenuItem value="user">用户</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="电话"
              fullWidth
              value={editForm.phone || ""}
              onChange={(e) => handleFormChange("phone", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>状态</InputLabel>
              <Select
                value={editForm.status || ""}
                label="状态"
                onChange={(e) => handleFormChange("status", e.target.value)}
              >
                <MenuItem value="active">在职</MenuItem>
                <MenuItem value="inactive">离职</MenuItem>
              </Select>
            </FormControl>
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

export default UserManagement;
