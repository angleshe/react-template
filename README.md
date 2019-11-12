# react-template

### 开发环境

- 代码编辑器: [vscode](https://code.visualstudio.com/)（其他文本编辑器也行）
- 辅助插件: editorconfig （根据.editorconfig文件配置编辑器格式）
- 运行环境: [nodejs](https://nodejs.org)v10
- 依赖包管理工具: [npm](https://www.npmjs.com/)/[cnpm](https://npm.taobao.org/)（其他镜像也行）/[yarn](https://yarn.bootcss.com/)
- 代码管理工具: [Git](https://git-scm.com/)
- 代码管理模式（工作流）： Gitflow
- 调试工具：谷歌浏览器（带React Devtools插件），[开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### 使用

注入依赖
```sh
yarn install
```
开发
```sh
npm start
```
打包
```sh
npm run build
```
测试
```sh
npm run test
```

### 技术栈

- [React](https://reactjs.org/): 基础框架
- [antd](https://ant.design/index-cn): UI框架
- [umi](https://umijs.org): 构建框架
- [dva](https://dvajs.com/): 数据框架
- [React-router](https://reacttraining.com/react-router/): 路由
- [redux](https://cn.redux.js.org): 数据管理仓库
- [redux-Saga](https://redux-saga.js.org): 异步数据管理仓库工具
- [typescript](http://www.typescriptlang.org/): js语言类型
- Es6、js: 语言基础
- [less](http://lesscss.cn/): css预编译
- [Webpack](https://webpack.github.io/): 打包编译工具
- [Nodejs](http://nodejs.cn/): 构建语言基础

### 项目目录

```text
.
├── config/                        // 配置
│    ├── config.js                 // umi 配置
│    ├── route.ts                  // 路由配置
│    └── webpackPlugins.ts         // webpack配置
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── node_modules/                  // 依赖包
├── src/                           // 源码目录，可选
│    ├── assets/                   // 资源文件
│    ├── dto/                      // 数据接口
│    ├── layouts/index.js          // 全局布局
│    ├── models/                   // 全局数据模型
│    │   └── connect.d.ts          // 数据模型总类型
│    ├── pages/                    // 页面目录，里面的文件即路由
│    │   ├── .umi/                 // dev 临时目录，需添加到 .gitignore
│    │   ├── .umi-production/      // build 临时目录，会自动删除
│    │   ├── document.ejs          // HTML 模板
│    │   └── 404.js                // 404 页面
│    ├── services/                 // 接口服务
│    ├── utils/                    // 工具文件夹
│    │   ├── request               // ajax
│    │   ├── utils.less            // less mixins
│    │   └── utils.ts              // 工具函数
│    ├── app.ts                    // 运行时配置文件
│    ├── global.css                // 全局样式文件，自动引入
│    ├── global.ts                 // 全局脚本文件，自动引入 可以在这里加入 polyfill
│    └── typings.d.ts               // 全局类型
├── .editorconfig                  // 编辑器基本设置
├── .env                           // 环境变量
├── .eslintrc                      // eslint 配置
├── .gitignore                     // git忽略配置
├── .prettierignore                // 代码格式化忽略配置
├── .prettierrc                    // 代码格式化配置
├── package.json                   // 项目配置
├── README.md                      // 说明
├── tsconfig.json                  // typescript 配置文件
├── tslint.yml                     // tslint配置
└── yarn.lock                      // yarn依赖包版本锁定
```
