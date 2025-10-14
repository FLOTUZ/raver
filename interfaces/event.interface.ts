export interface Event {
  id: string;
  name: string;
  description?: string;
  host: string;
  image: string;
  banner?: string;
  init_date: string;
  end_date?: string;
  location: string;
  price: number;
  start_time: string;
  end_time?: string;
  created_at: string;
  updated_at: string;
}
