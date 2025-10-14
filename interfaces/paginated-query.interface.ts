export interface PaginatedQuery {
  page?: number;
  rows_per_page?: number;
  order_by_column?: string;
  order?: "asc" | "desc";
  filters?: string;
  search?: string;
}
