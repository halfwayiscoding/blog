export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

export const comments: Comment[] = [
  {
    id: '1',
    author: '前端开发者',
    avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=developer%20avatar&sign=2b121f1a4d1d0a8320f10a569c47b0cd',
    content: '这篇文章非常有用，特别是useEffect的依赖数组部分！',
    date: '2025-07-11'
  },
  {
    id: '2',
    author: 'React爱好者',
    avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=react%20developer%20avatar&sign=60689209c1f7b3c0579cbc2f28276dbc',
    content: '期待看到更多关于自定义Hooks的内容！',
    date: '2025-07-12'
  }
];
