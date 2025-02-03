import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart, removeToCart } from "../redux/cartSlice";
import { useState } from "react";
import { Star, ShoppingCart, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating] = useState(4);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, { icon: "🛒" });
  };

  const handleRemoveFromCart = () => {
    dispatch(removeToCart(product.id));
    toast.error(`${product.name} removed from cart!`, { icon: "❌" });
  };

  const cartItem = cart?.find((item) => item.id === product.id);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-5 border border-gray-200 transition-transform hover:scale-105">
      <div className="relative w-full h-60 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-52 object-contain transition-transform hover:scale-110"
        />
      </div>

      <div className="text-center mt-5">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {product.description.slice(0, 60)}...
        </p>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          ${product.price}
        </p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>

        <div className="flex justify-center mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition duration-200 shadow-md"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" /> Add
          </button>
          {cartItem && (
            <button
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition duration-200 shadow-md"
              onClick={handleRemoveFromCart}
            >
              <Trash2 className="h-5 w-5" /> Remove
            </button>
          )}
        </div>

        <button
          className="mt-4 w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition duration-200 shadow-md"
          onClick={() => navigate(`/product/${product.id}`, { state: product })}
        >
          <Eye className="h-5 w-5" /> View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
