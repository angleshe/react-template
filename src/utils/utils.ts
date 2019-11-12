/**
 * @description 判断参数类型
 * @author angle
 * @date 2019-11-07
 * @param {*} param 判断的参数
 * @param {string} type 类型名
 * @returns {boolean} 是否是指定类型的参数
 */
function isType (param: any, type: string): boolean {
  return Object.prototype.toString.call(param) === `[object ${type}]`;
}
/**
 * @description 判断参数是否为string
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {*} param 测试参数
 * @returns {boolean} 是否为string
 */
export function isString (param: any): boolean {
  return isType(param, 'String');
}
/**
 * @description 判断参数是否为Object
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {*} param 测试参数
 * @returns {boolean} 是否为object
 */
export function isObject (param: any): boolean {
  return isType(param, 'Object');
}
/**
 * @description 判断参数是否为Array
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {*} param 测试参数
 * @returns {boolean} 是否为Array
 */
export function isArray (param: any): boolean {
  return isType(param, 'Array');
}
/**
 * @description 判断参数是否为function
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {*} param 测试参数
 * @returns {boolean} 是否为function
 */
export function isFunction (param: any): boolean {
  return isType(param, 'Function');
}
/**
 * @description 判断参数是否为number
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {*} param 测试参数
 * @returns {boolean} 是否为number
 */
export function isNumber (param: any): boolean {
  return isType(param, 'Number');
}
/**
 * @description 判断对象是否为空对象
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {{[key: string]: any}} param 测试对象
 * @param {boolean} [hasUndefined=true] 是否可以接受undefined, 默认可以
 * @returns {boolean} 是否为空对象
 */
export function isEmptyObject (param: {[key: string]: any}, hasUndefined: boolean = true): boolean {
  return hasUndefined ? (Object.keys(param).filter(item => param[item] !== undefined).length === 0) : (Object.keys(param).length === 0);
}
/**
 * @description 判断参数是否为FormData
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {*} param 测试参数
 * @returns {boolean} 是否为FormData
 */
export function isFormData (param: any): boolean {
  return isType(param, 'FormData');
}
/**
 * @description 获取url参数
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {string} [url=window.location.href] url,默认为该页面的url
 * @returns {object} 参数对象
 */
export function getRequest(url: string = window.location.href): {[key: string]: string} {
  let paramsStr: string = url.split('?')[1] || '';
  if (paramsStr) {
    return paramsStr.split('&').reduce<any>((prev, curr) => {
      let [key, value] = curr.split('=')
      prev[key] = value
      return prev
    }, {})
  } else {
    return {}
  }
}
/**
 * @description 函数防抖
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {(...arg: any[]) => void} fn 需要处理函数
 * @param {number} [time=500] 时长,默认500ms
 * @returns {(...arg: any[]) => void} 处理后防抖函数
 */
export function debounce (fn: (...arg: any[]) => void, time: number = 500): (...arg: any[]) => void {
  let timer: number = 0;
  return function (...arg: any[]) {
    !!timer && clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(window, arg)
      timer = 0
    }, time);
  }
}
/**
 * @description src转Image
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export async function srcToImg (src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img: HTMLImageElement = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src
  })
}
/**
 * @description Image转Canvas
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {HTMLImageElement} img image
 * @returns {HTMLCanvasElement} canvas
 */
export function imgToCanvas (img: HTMLImageElement): HTMLCanvasElement {
  let canvas: HTMLCanvasElement = document.createElement<'canvas'>('canvas');
  let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx && ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}
/**
 * @description Canvas 转 Base64
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {HTMLCanvasElement} canvas canvas
 * @returns {string} base64
 */
export function canvasToBase64 (canvas: HTMLCanvasElement): string {
  return canvas.toDataURL()
}
/**
 * @description Base64 转blob
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {string} dataurl base64
 * @returns {Blob} blob
 */
export function base64ToBlob (dataurl: string): Blob {
  let arr: string[] = dataurl.split(';base64,');
  let mineArr: string [] = arr[0].split(':');
  if (arr[1] && mineArr[1]) {
    let bstr: string = atob(arr[1]);
    let n: number = bstr.length;
    let u8arr: Uint8Array = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mineArr[1]})
  } else {
    throw new TypeError('参数不为base64!');
  }
}
/**
 * @description Blob转File
 * @author angle
 * @date 2019-11-07
 * @export
 * @param {Blob} blob blob
 * @param {string} name 文件名
 * @returns {File} file
 */
export function blobToFile (blob: Blob, name: string): File {
  return new File([blob], name, {type: blob.type});
}
/**
 * @description 获取最外层滚动条高度
 * @author angle
 * @date 2019-11-08
 * @export
 * @returns {number} 滚动条高度
 */
export function getScrollTop (): number;
/**
 * @description 获取指定节点滚动条高度
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {HTMLElement} el dom节点
 * @returns {number} 滚动条高度
 */
export function getScrollTop (el: HTMLElement): number;
export function getScrollTop (el?: HTMLElement): number {
  if (el) {
    return el.scrollTop;
  } else {
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop
    } else {
      return document.body.scrollTop
    }
  }
}
/**
 * @description 下载文件
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {string} fileName 文件名
 * @param {File} file 文件
 */
export function downloadFile (fileName: string, file: File | Blob): void {
  let aLink: HTMLAnchorElement = document.createElement('a');
  let evt: Event = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(file);
  aLink.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }))
}
/**
 * @description 下载base64图片
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {string} fileName 文件名
 * @param {string} content base64
 */
export function downloadBase64 (fileName: string, content: string): void {
  downloadFile(fileName, base64ToBlob(content));
}
/**
 * @description 下载pdf
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {string} fileName 文件名
 * @param {BlobPart} content pdf内容
 */
export function downloadPDF (fileName: string, content: BlobPart): void {
  downloadFile(fileName, new Blob([content]));
}
/**
 * @description 格式化现在日期
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {string} fmt 格式
 * @returns {string} 格式化后的日期
 */
export function formDate (fmt: string): string;
/**
 * @description 格式化日期
 * @author angle
 * @date 2019-11-08
 * @export
 * @param {(Date | string | number)} date 日期
 * @param {string} fmt 格式
 * @returns {string} 格式化后的日期
 */
export function formDate (date: Date | string | number, fmt: string): string;
export function formDate (date: Date | string | number, fmt?: string): string {
  let time: Date
  if (!fmt) {
    fmt = date as string
    time = new Date()
  } else {
    time = new Date(date);
  }
  let o: {[key: string]: number} = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S': time.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k].toString()) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}
/**
 * @description 深拷贝数据对象
 * @author angle
 * @date 2019-11-08
 * @export
 * @template T 对象接口
 * @param {T} obj 对象
 * @returns {T} 拷贝后对象
 */
export function deepClone<T extends object> (obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
