import { Product, ProductInput } from '../types';

const API_URL = 'https://699f64043188b0b1d535fca0.mockapi.io/Products';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const addProduct = async (data: ProductInput): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

export const updateProduct = async ({ id, data }: { id: string; data: ProductInput }): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
};
