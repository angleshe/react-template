import { IConfig } from 'umi-types';
// 引入路由配置
import Routes from './route';
// 引入webpack配置
import webpackPlugin from './webpackPlugins';

const LessFunc = require('less-plugin-functions');

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: Routes,
  lessLoaderOptions: {
    javascriptEnabled: true,
    plugins: [
      new LessFunc()
    ]
  },
  history: 'hash',
  disableRedirectHoist: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'react-template',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api/': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
  },
  chainWebpack: webpackPlugin
}

export default config;
