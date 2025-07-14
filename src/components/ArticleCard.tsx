import { Link } from "react-router-dom";
import { Article } from "@/data/articles";
import { toast } from 'sonner';

export default function ArticleCard({ 
  article, 
  onDelete 
}: { 
  article: Article; 
  onDelete: (id: string) => void;
}) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('确定要删除这篇文章吗？')) {
      onDelete(article.id);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative">
      {article.owner === 'current-user' && (
        <button 
          onClick={handleDelete}
          className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="删除文章"
        >
          <i className="fa-solid fa-trash text-white"></i>
        </button>
      )}
      
      {article.coverImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span>{article.category}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
        </div>
        <Link to={`/article/${article.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 hover:text-teal-400 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-300 mb-4">{article.summary}</p>
        <div className="flex flex-wrap gap-2">
          {(article.tags || []).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-600 text-sm rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
