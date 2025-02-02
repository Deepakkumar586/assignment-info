import React from "react";

const ShoppingCart = ({ cart }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
      <button className="mt-4 bg-maisha-primary text-white px-4 py-2 rounded-md hover:bg-maisha-secondary">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default ShoppingCart;