import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart, removeToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleRemoveFromCart = () => {
    dispatch(removeToCart(product.id));
    toast.error(`${product.name} removed from cart!`, {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#ff4444",
        color: "#fff",
      },
    });
  };

  const cartItem = cart?.find((item) => item.id === product.id);

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl max-w-xs w-full mx-auto">
      {/* Product Image */}
      <div className="w-full h-60 bg-gray-100 flex justify-center items-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {product.title}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-4">
          {product.description.split(" ").slice(0, 15).join(" ") + "..."}
        </p>

        {/* Price & Category */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-blue-600">${product.price}</p>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Quantity & Total Price (if in cart) */}
        {cartItem && (
          <div className="mb-4">
            <p className="text-sm text-gray-700">
              Quantity:{" "}
              <span className="font-semibold">{cartItem.quantity}</span>
            </p>
            <p className="text-sm text-gray-700">
              Total:{" "}
              <span className="font-semibold">
                ${cartItem.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
          {cartItem && (
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={handleRemoveFromCart}
              aria-label={`Remove ${product.title} from cart`}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
