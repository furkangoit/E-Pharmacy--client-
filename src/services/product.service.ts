import api from './api';
import { Product } from '@/data/products'; // Use existing type

export interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
}

export const productService = {
    getAllProducts: async (params?: { search?: string; category?: string; page?: number; limit?: number }): Promise<ProductsResponse> => {
        const query = new URLSearchParams();
        if (params?.search) query.append('search', params.search);
        if (params?.category) query.append('category', params.category);
        if (params?.page) query.append('page', params.page.toString());
        if (params?.limit) query.append('limit', params.limit.toString());

        const response = await api.get(`/products?${query.toString()}`);
        return response.data;
    },

    getProductById: async (id: number): Promise<Product | undefined> => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            return undefined;
        }
    }
};
