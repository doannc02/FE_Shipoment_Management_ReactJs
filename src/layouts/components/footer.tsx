import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <ul>
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-400">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gray-400">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul>
              <li>
                <Link to="/shipping" className="hover:text-gray-400">
                  Vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-gray-400">
                  Đổi trả
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gray-400">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Kết nối với chúng tôi
            </h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400"
                >
                  <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400"
                >
                  <i className="fab fa-instagram"></i> {/* Instagram icon */}
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400"
                >
                  <i className="fab fa-twitter"></i> {/* Twitter icon */}
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Chúng tôi ở đâu?</h3>
            <p>Địa chỉ: 1234 Đường XYZ, Thành phố ABC, Quốc gia XYZ</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Ecommerce. Tất cả quyền lợi được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
