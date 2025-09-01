import { Ticket, User } from "@/interfaces";
export interface Checker {
  id: string;
  amount: number;
  user_id: string;
  user: User;
  created_at: Date;
  updated_at: Date;
  checked_tickets: Ticket[];
}
