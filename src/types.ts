export interface IProductDescription {
  title: string;
  text: string[];
}

export interface IProductDetails {
  year: number;
  id: string;
  namespaceId: string;
  name: string;
  category: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: IProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ICartProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

export enum Icons {
  HEART = 'Heart-icon',
  HEART_FILL = 'Heart-icon-fill',
  CART = 'Cart',
  ARROW_LEFT = 'Arrow-left',
  ARROW_RIGHT = 'Arrow-right',
  ARROW_BOTTOM = 'Arrow-down',
  ARROW_TOP = 'Arrow-up',
  HOME = 'Home',
  SEARCH = 'Search',
  MINUS = 'Minus',
  PLUS = 'Plus',
  CLOSE = 'Close',
  BURGER = 'Burger',
}

export interface ProductT {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface OrderT {
  id?: number;
  productId: string;
  userId: string;
  quantity: number;
  price: number;
  status: string;
}

export enum SortType {
  AZ = 'az',
  ZA = 'za',
  LOW_TO_HIGH = 'lowToHigh',
  HIGH_TO_LOW = 'highToLow',
  WITHOUT_SORT = 'without-sort',
  SHOW_ALL = 'show-all',
  NEWEST_TO_OLDEST = 'newest-to-oldest',
  OLDEST_TO_NEWEST = 'oldest-to-newest',
}
