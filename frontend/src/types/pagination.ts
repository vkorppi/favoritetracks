

export interface PaginationType {
    pagination: PaginationAttributes;
  }
  
  export interface PaginationAttributes {
    start: number;
    last: number;
    searchvalue: string;
    currentPage: number;
  }
  
  export type ActionPagination =
    {
      type: "UPDATE";
      data: PaginationAttributes;
    } |
    {
      type: "SET";
      data: PaginationAttributes;
    } |
    {
      type: "SETPAGE";
      data: PaginationAttributes;
    };