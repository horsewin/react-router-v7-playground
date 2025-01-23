import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { v7 as uuidV7 } from "uuid";
import type { Pet } from "~/types/pet";

interface CartItem extends Pet {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (pet: Pet) => void;
  removeFromCart: (petId: string) => void;
  clearCart: () => void;
  cartId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string>("");

  useEffect(() => {
    // Generate or retrieve cart ID
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId === null) {
      const id = uuidV7();
      localStorage.setItem("cartId", id);
      setCartId(id);
    } else {
      setCartId(storedCartId);
    }

    // Retrieve cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to localStorage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pet: Pet) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === pet.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prevItems, { ...pet, quantity: 1 }];
    });
  };

  const removeFromCart = (petId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== petId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartId }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
