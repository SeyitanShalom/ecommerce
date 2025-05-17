"use client";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  //   for (let index = 0; index < 300 + 1; index++) {
  //     cart[index] = 0;
  //   }
  return cart;
};

export default function ShopContextProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // Initialize as empty object

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data); // ✅ works because your backend returns the cart object directly
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const getTotalItems = () => {
    if (!cartItems) return 0;
    return Object.values(cartItems).reduce((total, sizes) => {
      if (!sizes) return total;
      return (
        total +
        Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0)
      );
    }, 0);
  };

  const addToCart = async (itemId, size) => {
    console.log("Adding to cart:", { itemId, size }); // Debug log

    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch("http://localhost:4000/addtocart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ itemId, size }),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Read the raw response text
          console.error("Error response text:", errorText); // Debug log
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Add to cart response:", data); // Debug log

        if (data.success) {
          setCartItems(data.cartData);
        } else {
          console.error("Add to cart failed:", data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      setCartItems((prev) => {
        const newCart = { ...prev };

        // Ensure itemId is an object
        if (typeof newCart[itemId] !== "object") {
          newCart[itemId] = {};
        }

        // Update size quantity
        if (!newCart[itemId][size]) {
          newCart[itemId][size] = 1;
        } else {
          newCart[itemId][size] += 1;
        }

        console.log("Updated cart (local):", newCart); // Debug log
        return newCart;
      });
    }
  };

  const removeFromCart = async (itemId, size) => {
    console.log("Removing from cart:", { itemId, size });

    if (!itemId || !size) {
      console.error("removeFromCart called with invalid arguments", {
        itemId,
        size,
      });
      return;
    }

    // Ensure itemId is treated as a number
    const numericItemId = parseInt(itemId, 10);

    if (localStorage.getItem("auth-token")) {
      try {
        const response = await fetch("http://localhost:4000/removefromcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ itemId, size }),
        });

        const data = await response.json();
        console.log("Remove API response:", data);

        if (data.success && data.cartData) {
          setCartItems({ ...data.cartData }); // Ensure data.cartData exists
        } else {
          console.error("Remove failed or no cartData:", data.message);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      // Local cart logic
      setCartItems((prev) => {
        const newCart = { ...prev };
        if (newCart[itemId]?.[size]) {
          if (newCart[itemId][size] > 1) {
            newCart[itemId][size] -= 1;
          } else {
            delete newCart[itemId][size];
            if (Object.keys(newCart[itemId]).length === 0) {
              delete newCart[itemId];
            }
          }
        } else {
          console.warn("Item not found in cart for removal", { itemId, size });
        }

        return { ...newCart };
      });
    }
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}
