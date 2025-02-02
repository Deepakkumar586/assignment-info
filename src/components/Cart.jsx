import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToCart, clearCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeToCart(id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        // Empty cart UI
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 h-40"
          />
          <p className="text-lg text-gray-500 mt-4">Your cart is empty</p>
          <Link
            to="/"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        // Cart with items UI
        <div className="bg-white p-6 shadow-lg rounded-lg">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">
                  ${item.price} x {item.quantity}
                </p>
                <p className="font-bold text-blue-600">
                  Total: ${item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <Link to="/checkout"> <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Checkout
            </button></Link>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
