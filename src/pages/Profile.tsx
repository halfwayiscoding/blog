import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';
import { z } from 'zod';

interface Draft {
  id: string;
  title: string;
  content: string;
  lastModified: string;
}

interface UserData {
  name: string;
  avatar: string;
  email: string;
}

interface StatsData {
  visitors: number[];
  dates: string[];
}

// Mock数据
const mockUser: UserData = {
  name: '用户昵称',
  avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=user%20avatar&sign=f1f81b57b203e2aa336aa3ec3f6e3f7f',
  email: 'user@example.com'
};

const mockStats: StatsData = {
  visitors: [120, 190, 150, 210, 180, 240, 200],
  dates: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
};

// 表单验证schema
const profileSchema = z.object({
  name: z.string().min(2, '昵称至少2个字符').max(20, '昵称最多20个字符'),
  email: z.string().email('请输入有效的邮箱地址')
});

export default function Profile() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [user, setUser] = useState<UserData>(mockUser);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [stats] = useState<StatsData>(mockStats);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 加载草稿数据
  useEffect(() => {
    const savedDrafts = localStorage.getItem('drafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      profileSchema.parse(formData);
      setErrors({});
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      toast.success('个人信息已更新');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach(error => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  // 处理草稿点击
  const handleDraftClick = (draftId: string) => {
    navigate(`/editor?draft=${draftId}`);
  };

  // 准备图表数据
  const chartData = stats.dates.map((date, index) => ({
    date,
    visitors: stats.visitors[index]
  }));

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} text-gray-900 dark:text-white`}>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">个人中心</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧 - 用户设置 */}
          <div className="lg:w-1/3">
            <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-6">个人信息</h2>
              
              <div className="flex flex-col items-center mb-6">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    昵称
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} ${isDark ? 'bg-gray-700' : 'bg-white'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} ${isDark ? 'bg-gray-700' : 'bg-white'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition-colors"
                >
                  保存更改
                </button>
              </form>
            </div>
          </div>
          
          {/* 右侧 - 数据区域 */}
          <div className="lg:w-2/3 space-y-6">
            {/* 访客数据图表 */}
            <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-6">访客数据</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#4B5563' : '#E5E7EB'} />
                    <XAxis 
                      dataKey="date" 
                      stroke={isDark ? '#9CA3AF' : '#6B7280'} 
                    />
                    <YAxis 
                      stroke={isDark ? '#9CA3AF' : '#6B7280'} 
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                        borderColor: isDark ? '#374151' : '#E5E7EB',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#20c997" 
                      fill="#20c997" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* 草稿列表 */}
            <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-6">我的草稿 ({drafts.length})</h2>
              
              {drafts.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <i className="fa-regular fa-file-lines text-4xl mb-2"></i>
                  <p>暂无草稿</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drafts.map(draft => (
                    <div 
                      key={draft.id}
                      onClick={() => handleDraftClick(draft.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{draft.title || '无标题草稿'}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(draft.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {draft.content.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
