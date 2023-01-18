import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isPasswordMatch: (password: string) => Promise<boolean>;
}
