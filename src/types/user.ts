export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'admin' | 'user';
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
} 