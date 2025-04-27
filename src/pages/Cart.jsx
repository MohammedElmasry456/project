import React from "react";
import { useCart } from "../hooks/CartContext";

const Cart = () => {
  const { cartState, cartDispatch } = useCart();
  const { cartItems } = cartState;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleRemove = (id) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded-xl bg-white">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4 font-bold text-xl">
            Total: ${total}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
