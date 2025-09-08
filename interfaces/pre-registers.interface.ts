import { Event } from "./event.interface";
import { Ticket } from "./ticket.interface";

export interface PreRegister {
  id: string;
  name: string;
  email: string;
  telephone: string;
  is_sended: boolean;
  event_id: string;
  created_at: Date;
  updated_at: Date;
  event: Event;
  ticket: Ticket;
}
