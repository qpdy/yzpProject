import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  interviewSidebar: [
    {
      type: 'category',
      label: 'HTML',
      items: [
        'interview/html',
      ],
    },
    {
      type: 'category',
      label: 'CSS',
      items: [
        'interview/css',
      ],
    },
    {
      type: 'category',
      label: 'JavaScript',
      items: [
        'interview/js',
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'interview/typescript',
      ],
    },
    {
      type: 'category',
      label: 'Vue',
      items: [
        'interview/vue',
      ],
    },
    {
      type: 'category',
      label: 'React',
      items: [
        'interview/react',
      ],
    },
    {
      type: 'category',
      label: 'Node.js',
      items: [
        'interview/node',
      ],
    },
    {
      type: 'category',
      label: '前端工程化',
      items: [
        'interview/engineering',
      ],
    },
    {
      type: 'category',
      label: '软件工程与团队协作',
      items: [
        'interview/other',
      ],
    },
    {
      type: 'category',
      label: '设计模式',
      items: [
        'interview/design-patterns',
      ],
    },
    {
      type: 'category',
      label: '框架对比',
      items: [
        'interview/vue-vs-react',
      ],
    },
  ],
};

export default sidebars;
