export interface BookingManageFilters {
  status: 'all' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  roomId: string;
  dateRange: {
    start: string;
    end: string;
  };
  userId?: string;
} 