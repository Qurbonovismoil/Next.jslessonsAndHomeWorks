export interface Product {
  id: string;
  name: string;
  price: string;
  images: string;
  avatar: string;
}

export type ProductInput = Omit<Product, 'id'>;
