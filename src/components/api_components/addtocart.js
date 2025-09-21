"use client";
import { useState } from "react";
import axios from "axios";

export default function CartAdd({ userId, product }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!userId || !product?._id) return;

    setLoading(true);

    try {
      const payload = {
        userId,
        cartItems: [
          {
            productId: product._id,
            vendorId: product.vendorId || "",
            name: product.productName,
            variant: product.variant || "Default",
            quantity: product.quantity || 1,
            price: product.price || 0,
            discount: product.discount || 0,
            finalPrice: product.finalPrice || product.price || 0,
            image: product.thumbnail || ""
          }
        ]
      };

      const res = await axios.post("https://secure1.mirrorhub.in/api/cart/add", payload, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data.success) {
        setAdded(true);
        alert("Product added to cart!");
      } else {
        alert(res.data.message || "Failed to add to cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Error adding to cart!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors ${added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
      disabled={loading || added}
    >
      {loading ? "Adding..." : added ? "Added" : "Add to Cart"}
    </button>
  );
}
