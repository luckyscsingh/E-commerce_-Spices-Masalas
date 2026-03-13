import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from backend on mount or when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await api.get("/api/cart");
          if (res.data.success) {
            // Map the backend fields to match the frontend expected structure
            const formattedCart = res.data.cart.map(item => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image?.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`,
              quantity: item.quantity,
            }));
            setCartItems(formattedCart);
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        // Fallback to local storage if not logged in
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCartItems(JSON.parse(savedCart));
      }
    };
    fetchCart();
  }, [user]);

  // Save cart to localStorage whenever it changes (for guests)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // ✅ Add to cart function
  const addToCart = async (product) => {
    // Optimistic update
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevItems, product];
    });

    if (user) {
      try {
        await api.post("/api/cart", {
          productId: product.id,
          quantity: cartItems.find(item => item.id === product.id)?.quantity + product.quantity || product.quantity
        });
      } catch (error) {
        console.error("Failed to save cart to server", error);
        // Optionally fetchCart() again to revert optimistic update
      }
    }
  };

  // ✅ Remove item
  const removeFromCart = async (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    
    if (user) {
      try {
        await api.delete(`/api/cart/${id}`);
      } catch (error) {
        console.error("Failed to remove item from server", error);
      }
    }
  };

  // ✅ Increase quantity
  const increaseQty = async (id) => {
    let newQuantity = 0;
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          newQuantity = item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    if (user && newQuantity > 0) {
      try {
        await api.post("/api/cart", { productId: id, quantity: newQuantity });
      } catch (error) {
        console.error("Failed to sync quantity", error);
      }
    }
  };

  // ✅ Decrease quantity
  const decreaseQty = async (id) => {
    let newQuantity = 0;
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.quantity > 1) {
          newQuantity = item.quantity - 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    if (user && newQuantity > 0) {
      try {
        await api.post("/api/cart", { productId: id, quantity: newQuantity });
      } catch (error) {
        console.error("Failed to sync quantity", error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);