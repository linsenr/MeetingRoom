import { Booking } from '../types/booking';

export const mockBookings: Booking[] = [
  {
    id: "1",
    roomId: "1",
    userId: "1",
    title: "项目周会",
    startTime: "2024-03-20T09:00",
    endTime: "2024-03-20T10:00",
    attendees: ["1", "2", "3"],
    status: "approved",
    description: "讨论项目进度",
    createdAt: "2024-03-19T10:00"
  },
  {
    id: "2",
    roomId: "2",
    userId: "2",
    title: "部门会议",
    startTime: "2024-03-21T14:00",
    endTime: "2024-03-21T16:00",
    attendees: ["2", "3", "4"],
    status: "pending",
    description: "部门季度总结",
    createdAt: "2024-03-19T11:00"
  }
]; 