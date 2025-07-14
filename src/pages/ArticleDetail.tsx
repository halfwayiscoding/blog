import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { ArticleDetail, articleDetails } from '@/data/articleDetail';
import { comments as allComments } from '@/data/comments';
import { Article } from '@/data/articles';
import 'highlight.js/styles/github.css';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const foundArticle = articleDetails.find(a => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      setLikes(foundArticle.likes);
      const articleComments = allComments.filter(c => foundArticle.comments.includes(c.id));
      setComments(articleComments);
    } else {
      navigate('/');
      toast.error('文章不存在');
    }
  }, [id, navigate]);

  const handleLike = () => {
    setLikes(prev => prev + 1);
    toast.success('感谢点赞！');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title || '',
        text: '看看这篇文章：',
        url: window.location.href,
      }).catch(() => {
        toast.error('分享失败');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('评论内容不能为空');
      return;
    }
    const newComment = {
      id: Date.now().toString(),
      author: '匿名用户',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=anonymous%20user%20avatar&sign=4947d55dca958803190188d57dfd9653',
      content: comment,
      date: new Date().toISOString().split('T')[0]
    };
    setComments(prev => [...prev, newComment]);
    setComment('');
    toast.success('评论已提交');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('请输入邮箱地址');
      return;
    }
    setIsSubscribed(true);
    toast.success('订阅成功！');
    setEmail('');
  };

  const openImageModal = (src: string) => {
    setCurrentImage(src);
    setShowImageModal(true);
  };

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 文章内容区 */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                返回文章列表
              </button>
              
              {article.owner === 'current-user' && (
                <div className="flex space-x-3">
                  <button 
                    onClick={() => navigate(`/editor?edit=${article.id}`)}
                    className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    编辑
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('确定要删除这篇文章吗？')) {
                        const articles = JSON.parse(localStorage.getItem('articles') || '[]');
                        const updatedArticles = articles.filter((a: Article) => a.id !== article.id);
                        localStorage.setItem('articles', JSON.stringify(updatedArticles));
                        toast.success('文章已删除');
                        navigate('/');
                      }
                    }}
                    className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
                  >
                    <i className="fa-solid fa-trash mr-2"></i>
                    删除
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{article.title}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{likes} 点赞</span>
            </div>

            {article.coverImage && (
              <div className="mb-8 rounded-lg overflow-hidden cursor-zoom-in" onClick={() => openImageModal(article.coverImage!)}>
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  img: ({ src, alt }) => (
                    <img 
                      src={src || ''} 
                      alt={alt || ''} 
                      className="my-4 rounded-lg cursor-zoom-in"
                      onClick={() => openImageModal(src || '')}
                    />
                  )
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* 互动功能区 */}
          <div className="lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">互动</h3>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleLike}
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-heart text-red-500 mr-2"></i>
                  <span>点赞 ({likes})</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-share-nodes text-blue-500 mr-2"></i>
                  <span>分享</span>
                </button>
              </div>
            </div>

            {/* 订阅表单 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">订阅更新</h3>
              
              {isSubscribed ? (
                <div className="text-center py-4 text-teal-600 dark:text-teal-400">
                  <i className="fa-solid fa-check-circle text-2xl mb-2"></i>
                  <p>已订阅成功！</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                  >
                    订阅
                  </button>
                </form>
              )}
            </div>

            {/* 评论区域 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">评论 ({comments.length})</h3>
              
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="mb-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="写下你的评论..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                >
                  提交评论
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex space-x-3">
                    <img 
                      src={c.avatar} 
                      alt={c.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">{c.author}</span>
                        <span className="text-xs text-gray-500">{c.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 图片模态框 */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="max-w-4xl w-full">
            <img 
              src={currentImage} 
              alt="放大图片"
              className="w-full h-auto max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
