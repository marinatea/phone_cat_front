import { IProductDetails, ProductT } from '../types';

export const convertToProductT = (product: IProductDetails): ProductT => {
  const category =
    product.category === 'phones' ||
    product.category === 'tablets' ||
    product.category === 'accessories'
      ? product.category
      : 'phones';

  return {
    id: parseInt(product.id),
    category,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 0,
    image: product.images[0],
  };
};

export const convertToProductDetails = (product: ProductT): IProductDetails => {
  return {
    id: product.itemId,
    namespaceId: '',
    name: product.name,
    category: product.category,
    capacityAvailable: [product.capacity],
    capacity: product.capacity,
    priceRegular: product.fullPrice,
    priceDiscount: product.price,
    colorsAvailable: [product.color],
    color: product.color,
    images: [product.image],
    description: [],
    screen: product.screen,
    resolution: '',
    processor: '',
    ram: product.ram,
    camera: '',
    zoom: '',
    cell: [],
    year: product.year,
  };
};
