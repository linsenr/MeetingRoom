import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    department: "技术部",
    role: "admin",
    phone: "13800138000",
    status: "active",
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    department: "人事部",
    role: "user",
    phone: "13800138001",
    status: "active",
    createdAt: "2024-01-02"
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    department: "市场部",
    role: "user",
    phone: "13800138002",
    status: "inactive",
    createdAt: "2024-01-03"
  }
]; 