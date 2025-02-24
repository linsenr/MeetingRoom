import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../types/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange =
    (field: keyof LoginForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: event.target.value,
      });
      setError("");
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 这里是模拟登录验证
    if (form.username === "admin" && form.password === "admin123") {
      // 模拟管理员登录成功
      const mockAuthResponse = {
        token: "mock-jwt-token",
        user: {
          id: "1",
          username: "admin",
          role: "admin",
        },
      };

      // 保存token和用户信息
      localStorage.setItem("token", mockAuthResponse.token);
      localStorage.setItem("user", JSON.stringify(mockAuthResponse.user));

      // 跳转到主页
      navigate("/user-management");
    } else if (form.username === "user" && form.password === "user123") {
      // 模拟普通用户登录成功
      const mockAuthResponse = {
        token: "mock-jwt-token",
        user: {
          id: "2",
          username: "user",
          role: "user",
        },
      };

      // 保存token和用户信息
      localStorage.setItem("token", mockAuthResponse.token);
      localStorage.setItem("user", JSON.stringify(mockAuthResponse.user));

      // 跳转到主页
      navigate("/meeting-booking");
    } else {
      setError("用户名或密码错误");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            会议室预约系统
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="用户名"
            fullWidth
            value={form.username}
            onChange={handleChange("username")}
            required
            autoComplete="username"
          />

          <TextField
            label="密码"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange("password")}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            登录
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
