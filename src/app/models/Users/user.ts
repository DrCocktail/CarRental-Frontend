import { CustomerDetails } from '../Customers/customerDetail';

export interface User extends CustomerDetails {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
}
