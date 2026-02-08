'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService, CartItem } from '@/services/cart.service';

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const initCart = async () => {
            try {
                const items = await cartService.getCart();
                setCartItems(items);
            } catch (error) {
                console.error('Failed to load cart', error);
            }
        };
        initCart();
    }, []);

    const addToCart = async (productId: number, quantity: number = 1) => {
        try {
            const response = await cartService.addToCart(productId, quantity);
            if (response.cart) {
                setCartItems(response.cart);
            } else {
                const items = await cartService.getCart();
                setCartItems(items);
            }
        } catch (error) {
            console.error('Failed to add to cart', error);
            throw error;
        }
    };

    const removeFromCart = async (productId: number) => {
        try {
            const response = await cartService.removeFromCart(productId);
            if (response.cart) {
                setCartItems(response.cart);
            } else {
                const items = await cartService.getCart();
                setCartItems(items);
            }
        } catch (error) {
            console.error('Failed to remove from cart', error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
