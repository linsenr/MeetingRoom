import { Room } from '../types/room';

export const mockRooms: Room[] = [
  {
    id: "1",
    name: "会议室A",
    capacity: 10,
    location: "1楼",
    facilities: ["投影仪", "白板"],
    status: "available",
    description: "小型会议室"
  },
  {
    id: "2",
    name: "会议室B",
    capacity: 20,
    location: "2楼",
    facilities: ["投影仪", "视频会议系统", "白板"],
    status: "available",
    description: "中型会议室"
  },
  {
    id: "3",
    name: "会议室C",
    capacity: 30,
    location: "3楼",
    facilities: ["投影仪", "音响系统", "视频会议系统"],
    status: "maintenance",
    description: "大型会议室"
  }
]; 