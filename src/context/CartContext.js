import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localCart = localStorage.getItem('cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch (e) {
            console.error('Error parsing cart from localStorage', e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newDiff) => {
        setCart((prevCart) => {
             return prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = Math.max(1, item.quantity + newDiff); // Ensure quantity is at least 1
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };
    
    //Directly set quantity
    const setItemQuantity = (productId, quantity) => {
        if(quantity < 1) return;
        setCart(prevCart => prevCart.map(item => item.id === productId ? {...item, quantity: quantity} : item));
    }

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0); // Assuming item has price

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setItemQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
