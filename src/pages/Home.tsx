import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
import { articles, Article } from "@/data/articles";
import { toast } from 'sonner';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [localArticles, setLocalArticles] = useState<Article[]>(articles);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setLocalArticles(JSON.parse(savedArticles));
    }
  }, []);

  const filteredArticles = localArticles
    .filter(article => 
      selectedCategory === "全部" || article.category === selectedCategory
    )
    .filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
       <main className="container mx-auto px-4 pt-24 pb-12">
         <div className="mb-8">
           <h1 className="text-3xl font-bold mb-4">最新文章</h1>
           <p className="text-teal-400 mb-4">
             <i className="fa-solid fa-circle-info mr-2"></i>
             您现在可以点击"写博客"按钮创建新文章，或在文章详情页编辑/删除您的文章
           </p>
          <div className="flex flex-wrap gap-4 mb-6">
            {['全部', '技术', '生活'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-teal-500' : 'bg-gray-700'} hover:bg-teal-600 transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onDelete={(id) => {
                const articles = JSON.parse(localStorage.getItem('articles') || '[]');
                const updatedArticles = articles.filter((a: Article) => a.id !== id);
                localStorage.setItem('articles', JSON.stringify(updatedArticles));
                toast.success('文章已删除');
                setLocalArticles(updatedArticles); // 更新本地状态
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
