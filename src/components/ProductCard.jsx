import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart, removeToCart } from "../redux/cartSlice";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, { icon: "🛒" });
  };

  const handleRemoveFromCart = () => {
    dispatch(removeToCart(product.id));
    toast.error(`${product.name} removed from cart!`, { icon: "❌" });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") {
      toast.error("Please add a rating and review!");
      return;
    }
    setReviews([...reviews, { rating, review }]);
    setRating(0);
    setReview("");
    toast.success("Review submitted!");
  };

  const cartItem = cart?.find((item) => item.id === product.id);

  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden hover:scale-105 transition transform duration-300 p-4 grid grid-cols-1 gap-4 max-w-sm mx-auto">
      <div className="w-full h-56 flex justify-center items-center bg-gray-100 p-4">
        <img src={product.image} alt={product.title} className="h-48 object-contain" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{product.description.slice(0, 50)}...</p>
        <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {cartItem && (
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition" onClick={handleRemoveFromCart}>
              Remove
            </button>
          )}
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Leave a Review</h4>
          <form onSubmit={handleReviewSubmit} className="mt-2 grid gap-2">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" className={`text-xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`} onClick={() => setRating(star)}>
                  ★
                </button>
              ))}
            </div>
            <textarea className="w-full p-2 border rounded-md" placeholder="Write your review..." value={review} onChange={(e) => setReview(e.target.value)} required></textarea>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Submit Review
            </button>
          </form>
          {reviews.length > 0 && (
            <div className="mt-4 max-h-32 overflow-y-auto border rounded-md p-2 bg-gray-50">
              {reviews.map((r, index) => (
                <div key={index} className="border-b pb-2 mb-2">
                  <p className="text-yellow-500">{`★`.repeat(r.rating)}</p>
                  <p className="text-gray-700">{r.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
