import api from './api';
import { Product } from '@/data/products';

export interface CartItem {
    product: Product;
    quantity: number;
}

export const cartService = {
    getCart: async (): Promise<CartItem[]> => {
        const response = await api.get('/cart');
        return response.data;
    },

    addToCart: async (productId: number, quantity: number = 1) => {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    removeFromCart: async (productId: number) => {
        const response = await api.delete(`/cart?productId=${productId}`);
        return response.data;
    }
};
