export interface PaginatedResponse<T> {
  pages: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_rows: number;
  rows_per_page: number;
  rows: T[];
}
