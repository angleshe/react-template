import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
/**
 * axios配置
 */
const config: AxiosRequestConfig = {
  baseURL: ''
}

const axios:AxiosInstance = Axios.create(config);

export default axios;
