export interface ArticleDetail {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: string[];
  coverImage?: string;
  published: boolean;
  owner: string; // 作者ID
}

export const articleDetails: ArticleDetail[] = [
  {
    id: '1',
    title: 'React Hooks 最佳实践',
    content: `# React Hooks 最佳实践

## 1. useState

\`\`\`javascript
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## 2. useEffect

\`\`\`javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

![React Hooks](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%20Hooks%20illustration&sign=ff111c14431098bc4a1e158dea8d5622)
`,
    date: '2025-07-10',
    likes: 42,
    comments: ['1', '2'],
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=React%20Hooks%20illustration&sign=ff111c14431098bc4a1e158dea8d5622'
  }
];
