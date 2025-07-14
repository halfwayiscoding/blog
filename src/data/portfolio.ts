export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  images: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: '个人博客系统',
    description: '基于React和Node.js的全栈博客系统，支持Markdown编辑和用户认证',
    category: 'Web开发',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    images: [
      'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=blog%20system%20screenshot&sign=0eece8c16ff1ccf0ae38d0acf5a2ddcf',
      'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=blog%20editor%20interface&sign=d44977a52a93a53ed4855d4d2de27b32'
    ],
    link: 'https://github.com/username/blog-system'
  },
  {
    id: '2',
    title: '电商移动应用',
    description: '使用React Native开发的跨平台电商应用，包含商品浏览和支付功能',
    category: '移动开发',
    techStack: ['React Native', 'Redux', 'Firebase'],
    images: [
      'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_16_9&prompt=ecommerce%20mobile%20app&sign=97b3a4f1c4bedb6b56a73e64130804aa',
      'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_16_9&prompt=shopping%20cart%20screen&sign=688455bac071bbe7a662eaabdfb18004'
    ]
  },
  {
    id: '3',
    title: '数据分析仪表盘',
    description: '使用D3.js构建的数据可视化仪表盘，支持实时数据更新',
    category: '数据可视化',
    techStack: ['D3.js', 'TypeScript', 'WebSocket'],
    images: [
      'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=data%20dashboard&sign=392cb997dc18fb4c82817a19dc932321',
      'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=data%20visualization&sign=34409b7b1f09769d975db4736e87b712'
    ],
    link: 'https://github.com/username/data-dashboard'
  }
];

export const categories = ['全部', 'Web开发', '移动开发', '数据可视化'];
