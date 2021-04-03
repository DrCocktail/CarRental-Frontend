import { Customer } from './customer';

export interface CustomerDetails extends Customer {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
}
