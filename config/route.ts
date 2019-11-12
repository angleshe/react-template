import {IRoute} from 'umi-types';
const Routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/home', component: '../pages/index' }
    ]
  }
];

export default Routes
