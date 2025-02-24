export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  description?: string;
  createdAt: string;
} 