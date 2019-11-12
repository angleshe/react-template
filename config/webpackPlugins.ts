import {IChangeWebpackConfigFunc, IWebpackChainConfig} from 'umi-types';
import path from 'path';
import {IAFWebpackConfig} from 'umi-types/config'
const webpackPlugins: IChangeWebpackConfigFunc<IWebpackChainConfig, IAFWebpackConfig> = (config: IWebpackChainConfig) => {
  config.module.rule('less').test(/\.less$/).use('style-resources-loader').loader('style-resources-loader').options({
    patterns: [
      path.resolve(__dirname, '../src/utils/utils.less')
    ]
  })
}

export default webpackPlugins;
