import { UserRole } from "./user-role";

export interface User {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  profilePictureUrl: string;
  token?: string;
}
