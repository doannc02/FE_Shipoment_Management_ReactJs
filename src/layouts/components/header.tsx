import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa"; // Các icon để tìm kiếm và giỏ hàng

export const Header = () => {
  return (
    <header className="bg-orange-400 text-white sticky top-0 z-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text-white">
            Ecommerce
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="relative flex items-center w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full py-2 px-4 rounded-l-lg focus:outline-none"
            style={{ border: "1px solid #ccc" }}
          />
          <button className="absolute right-0 p-2 bg-blue-600 text-white rounded-r-lg">
            <FaSearch />
          </button>
        </div>

        {/* Menu điều hướng và Giỏ hàng */}
        <div className="flex items-center gap-8">
          {/* Menu điều hướng */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-gray-400">
              Trang chủ
            </Link>
            <Link to="/products" className="hover:text-gray-400">
              Sản phẩm
            </Link>
            <Link to="/about" className="hover:text-gray-400">
              Giới thiệu
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Liên hệ
            </Link>
          </nav>

          {/* Giỏ hàng */}
          <div className="relative">
            <Link to="/cart">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2 py-1">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
