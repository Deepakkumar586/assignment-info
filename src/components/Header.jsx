import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHome } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state)=>state.cart);
  return (
    <header className="bg-maisha-primary p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide hover:text-maisha-secondary transition duration-300">
          Maisha Infotech Store
        </Link>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="flex items-center hover:text-maisha-secondary transition duration-300">
                <FiHome className="mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center hover:text-maisha-secondary transition duration-300 relative">
                <FiShoppingCart className="mr-1" /> Cart
                {
                  cart.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cart.length}</span>
                }
                
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
