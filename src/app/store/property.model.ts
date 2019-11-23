export interface Property {
  id?: number;
  title: string;
  description?: string;
  price: number;
  type: string;
  location: string;
  image: string;
  status?: string;
}


export const enum VISIBILITY_FILTER {
  SHOW_ALL = 'All',
  SHOW_RENTAL = 'Rent',
  SHOW_FOR_SALE = 'Sale',
}
