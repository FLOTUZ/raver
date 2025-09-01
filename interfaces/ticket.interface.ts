import { Event } from "./event.interface";

export interface Ticket {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  payment_reference: string;
  price: number;
  is_paid: boolean;
  is_dynamic: boolean;
  mail_sent: boolean;
  event_id: string;
  event: Event;
  checker_id: string;
  checked_by: string;
  cheked_at: string;
  created_at: string;
  updated_at: string;
}
