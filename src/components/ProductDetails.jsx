import { useLocation } from "react-router-dom";
import { ShoppingCart, Send } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state;
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, user: "Amit Sharma", comment: "Great product! Highly recommend." },
    { id: 2, user: "Priya Verma", comment: "Good quality, fast delivery!" },
  ]);

  if (!product) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Product not found!
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, { icon: "🛒" });
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === "") {
      toast.error("Please enter feedback!", { icon: "⚠️" });
      return;
    }
    setReviews([
      ...reviews,
      { id: reviews.length + 1, user: "You", comment: feedback },
    ]);
    setFeedback("");
    toast.success("Feedback submitted!", { icon: "✅" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/2 bg-gray-100 p-4 rounded-lg flex justify-center items-center">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mt-4">
            ${product.price}
          </p>
          <p className="text-md text-gray-500 mt-2">
            Category: {product.category}
          </p>

          <div className="flex mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`h-5 w-5 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-blue-500 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition duration-200 shadow-md"
          >
            <ShoppingCart className="h-6 w-6" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-900">
          Customer Reviews
        </h3>
        <div className="mt-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-3 border rounded-lg bg-gray-100 my-2"
            >
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Feedback Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Write your review..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleFeedbackSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition duration-200 shadow-md"
          >
            <Send className="h-5 w-5" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
