import api from './api';

export interface PaymentDetails {
    paymentMethod: 'cash' | 'card' | 'bank';
    shippingDetails: unknown; // Type this better based on form
}

export const paymentService = {
    processPayment: async (details: PaymentDetails) => {
        const response = await api.post('/checkout', details);
        return response.data;
    }
};
