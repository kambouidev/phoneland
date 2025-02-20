"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ICartDevice } from '../types';

interface CartContextProps {
    cart: ICartDevice[];
    addToCart: (device: ICartDevice) => void;
    removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<ICartDevice[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (device: ICartDevice) => {
        setCart((prevCart) => [...prevCart, device]);
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((device) => device.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
