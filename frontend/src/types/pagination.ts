

export interface PaginationType {
    pagination: PaginationAttributes;
  }
  
  export interface PaginationAttributes {
    start: number;
    last: number;
    searchvalue: string;
    currentPage: number;
  }
  
  export type PaginationAttributesNosearchvalue = Omit<PaginationAttributes, 'searchvalue' >;
  export type PaginationAttributesOnlycurrentPage = Omit<PaginationAttributes, 'start'|'last'|'searchvalue' >;