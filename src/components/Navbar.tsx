import { Link } from "react-router-dom";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { categories } from "@/data/articles";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-teal-400 font-bold text-xl">
          MyBlog
        </Link>
        
        <div className="hidden md:flex space-x-6">
          {categories.map((category) => (
            <Link 
              key={category} 
              to={`/category/${category}`}
              className="hover:text-teal-400 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="搜索文章..."
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <i className="fa-solid fa-search absolute right-3 top-2.5 text-gray-400"></i>
          </div>

          <Link
            to="/editor"
            className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-full transition-colors animate-pulse hover:animate-none"
            title="开始写作"
          >
            <i className="fa-solid fa-pen mr-2"></i>
            写博客
          </Link>
        </div>
      </div>
    </nav>
  );
}
