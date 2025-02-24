export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  facilities: string[];
  status: 'available' | 'maintenance';
  description?: string;
} 