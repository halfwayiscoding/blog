import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Editor from "@/pages/Editor";
import ArticleDetail from "@/pages/ArticleDetail";
import Portfolio from "@/pages/Portfolio";
import Profile from "@/pages/Profile";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: true, // 默认设为已登录状态方便预览
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
  username: 'demo-user', // 添加用户名
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/category/:name" element={<div className="text-center text-xl">分类页面 - 开发中</div>} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}
