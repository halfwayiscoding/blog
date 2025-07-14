export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
  coverImage?: string;
  published: boolean;
  owner: string; // 作者ID
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'React Hooks 最佳实践',
    summary: '深入探讨React Hooks的使用技巧和常见陷阱',
    category: '技术',
    tags: ['React', '前端'],
    date: '2025-07-10',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%20Hooks%20illustration&sign=ff111c14431098bc4a1e158dea8d5622'
  },
  {
    id: '2',
    title: '我的旅行日记：日本京都',
    summary: '记录在京都古都的所见所闻和文化体验',
    category: '生活',
    tags: ['旅行', '日本'],
    date: '2025-06-28',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Kyoto%20traditional%20street&sign=01b23c2ee7e6f725f9a9bc10ab5f143d'
  },
  {
    id: '3',
    title: 'TypeScript 类型系统进阶',
    summary: 'TypeScript高级类型技巧和实用模式分享',
    category: '技术',
    tags: ['TypeScript', '前端'],
    date: '2025-06-15'
  }
];

export const categories = ['全部', '技术', '生活'];
