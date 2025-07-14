import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Dropzone } from '@/components/Dropzone';
import { Article } from '@/data/articles';
import 'katex/dist/katex.min.css';

interface Draft {
  id: string;
  title: string;
  content: string;
  lastModified: string;
}

export default function Editor() {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const [draft, setDraft] = useState<Draft>({
    id: Date.now().toString(),
    title: '',
    content: '# 新文章\n\n从这里开始写作...',
    lastModified: new Date().toISOString(),
    published: false
  });

  const saveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
    const existingIndex = drafts.findIndex((d: Draft) => d.id === draft.id);
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = draft;
    } else {
      drafts.push(draft);
    }
    
    localStorage.setItem('drafts', JSON.stringify(drafts));
    toast.success('草稿已保存');
  };

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setDraft(prev => ({
        ...prev,
        content: `${prev.content}\n![${file.name}](${imageUrl})`
      }));
      toast.success('图片已插入');
    };
    reader.readAsDataURL(file);
  };

  const publishArticle = () => {
    saveDraft();
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const existingIndex = articles.findIndex((a: Article) => a.id === draft.id);
    
    const newArticle = {
      id: draft.id,
      title: draft.title,
      summary: draft.content.substring(0, 100) + (draft.content.length > 100 ? '...' : ''),
      content: draft.content,
      category: '技术', // 默认为技术分类
      tags: ['博客'],
      date: new Date().toISOString().split('T')[0],
      published: true,
      owner: 'current-user'
    };
    
    if (existingIndex >= 0) {
      articles[existingIndex] = newArticle;
    } else {
      articles.push(newArticle);
    }
    
    localStorage.setItem('articles', JSON.stringify(articles));
    toast.success('文章已发布！');
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors`}>
      {/* 简化导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md z-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-teal-400 hover:text-teal-300 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            返回
          </button>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button 
              onClick={saveDraft}
              className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              保存草稿
            </button>
            <button 
              onClick={publishArticle}
              className="px-4 py-1 rounded bg-teal-600 hover:bg-teal-500 transition-colors"
            >
              发布文章
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* 文章标题输入 */}
        <input
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({...draft, title: e.target.value})}
          placeholder="输入文章标题..."
          className={`w-full p-4 mb-4 text-2xl font-bold rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow`}
        />

        {/* 编辑器工具栏 */}
        <div className={`flex flex-wrap gap-2 p-3 mb-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <button 
            onClick={() => setDraft({...draft, content: `${draft.content}\n# 标题`})}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            H1
          </button>
          <button 
            onClick={() => setDraft({...draft, content: `${draft.content}\n## 二级标题`})}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            H2
          </button>
          <button 
            onClick={() => setDraft({...draft, content: `${draft.content}\n**加粗文字**`})}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <strong>B</strong>
          </button>
          <button 
            onClick={() => setDraft({...draft, content: `${draft.content}\n*斜体文字*`})}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <em>I</em>
          </button>
          <button 
            onClick={() => setDraft({...draft, content: `${draft.content}\n[链接文字](url)`})}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <i className="fa-solid fa-link"></i>
          </button>
          <button 
            onClick={() => setDraft({...draft, content: `${draft.content}\n\`代码片段\``})}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <i className="fa-solid fa-code"></i>
          </button>
          <Dropzone onDrop={handleImageUpload} />
        </div>

        {/* 分屏编辑器 */}
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-220px)]">
          {/* 编辑区 */}
          <div className="flex-1">
            <textarea
              value={draft.content}
              onChange={(e) => setDraft({...draft, content: e.target.value, lastModified: new Date().toISOString()})}
              className={`w-full h-full p-4 rounded-lg font-mono text-sm ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} shadow resize-none`}
              spellCheck="false"
            />
          </div>
          
          {/* 预览区 */}
          <div className={`flex-1 overflow-auto p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow lg:block`}>
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              className="prose dark:prose-invert max-w-none"
            >
              {draft.content}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}
