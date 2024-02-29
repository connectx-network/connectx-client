export type PaginationParam = {
  page?: number;
  size?: number;
  query?: string;
};

export type PaginationResponse<T> = {
  data: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElement: number;
};
