import {isString, isObject, isArray, isFunction, isNumber, isEmptyObject, isFormData, getRequest, debounce, formDate, deepClone} from '../utils';
import * as assert from 'assert';
const typeTestData: {[key: string]: any} = {
  stringTest1: 'asd',
  stringTest2: '',
  // tslint:disable-next-line:no-construct
  stringTest3: new String(),
  numberTest1: 1,
  numberTest2: Infinity,
  numberTest3: -2,
  numberTest4: 0,
  numberTest5: NaN,
  // tslint:disable-next-line:no-construct
  numberTest6: new Number(),
  objectTest1: {
    a: 1
  },
  objectTest2: {},
  objectTest3: new Object(),
  booleanTest1: true,
  booleanTest2: false,
  // tslint:disable-next-line:no-construct
  booleanTest3: new Boolean(),
  functionTest1: () => 'a',
  functionTest2: () => void 0,
  functionTest3: async () => 0,
  arrayTest1: [1, '2', { a: 'test' }, false],
  arrayTest2: new Array(),
  arrayTest3: [],
  formDataTest1: new FormData()
};
const typeKeys: string[] = Object.keys(typeTestData);
describe('utils.ts', () => {
  // isString
  describe('isString()', () => {
    typeKeys.forEach((item: string) => {
      it (typeTestData[item].toString() || JSON.stringify(typeTestData[item]), () => {
        let res = isString(typeTestData[item])
        expect(res).toBe(/^stringTest\d+$/.test(item))
      })
    })
  });
  // isObjec
  describe('isObject()', () => {
    typeKeys.forEach((item: string) => {
      it(typeTestData[item].toString() || JSON.stringify(typeTestData[item]), () => {
        let res = isObject(typeTestData[item]);
        expect(res).toBe(/^objectTest\d+$/.test(item))
      })
    })
  });
  // isArray
  describe('isArray()', () => {
    typeKeys.forEach((item: string) => {
      it(typeTestData[item].toString() || JSON.stringify(typeTestData[item]), () => {
        let res = isArray(typeTestData[item]);
        expect(res).toBe(/^arrayTest\d+$/.test(item))
      })
    })
  });
  // isFunction
  describe('isFunction()', () => {
    typeKeys.forEach((item: string) => {
      it(typeTestData[item].toString() || JSON.stringify(typeTestData[item]), () => {
        let res = isFunction(typeTestData[item]);
        expect(res).toBe(/^functionTest\d+$/.test(item))
      })
    })
  });
  // isNumber
  describe('isNumber()', () => {
    typeKeys.forEach((item: string) => {
      it(typeTestData[item].toString() || JSON.stringify(typeTestData[item]), () => {
        let res = isNumber(typeTestData[item]);
        expect(res).toBe(/^numberTest\d+$/.test(item))
      })
    })
  });
  // isEmptyObject
  describe('isEmptyObject()', () => {
    it('空对象', () => {
      let testData: {} = {}
      expect(isEmptyObject(testData)).toBe(true)
    })
    it('不为空对象', () => {
      let testData: {} = {
        a: false,
        b: 0,
        c: null
      }
      expect(isEmptyObject(testData)).toBe(false)
    })
    it('undefined', () => {
      let testData: {} = {
        a: undefined
      }
      expect(isEmptyObject(testData)).toBe(true)
      expect(isEmptyObject(testData, false)).toBe(false)
    })
  });
  // isFormData
  describe('isFormData()', () => {
    typeKeys.forEach((item: string) => {
      it(typeTestData[item].toString() || JSON.stringify(typeTestData[item]), () => {
        let res = isFormData(typeTestData[item]);
        expect(res).toBe(/^formDataTest\d+$/.test(item))
      })
    })
  });
  // getRequest
  describe('getRequest()', () => {
    it('url没有参数', () => {
      let test1: {} = getRequest('http://test.com');
      let test2: {} = getRequest('http://test.com/test.html#abc')
      let test3: {} = getRequest('http://test.com/test/test')
      assert.deepStrictEqual(test1, {});
      assert.deepStrictEqual(test2, {});
      assert.deepStrictEqual(test3, {});
    })
    it('url有参数', () => {
      let test: {} = getRequest('http://test.com/test.html#abc?a=1&b=2');
      assert.deepStrictEqual(test, {
        a: '1',
        b: '2'
      })
    })
    it('没参数', () => {
      (global as any).window = Object.create(window);
      Object.defineProperty(window, 'location', {
        value: {
          href: 'http://test.com/test.html#abc?a=1&b=2'
        }
      });
      assert.deepStrictEqual(getRequest(), {
        a: '1',
        b: '2'
      })
    })
  });
  // debounce
  describe('debounce()', () => {
    it('执行函数次数', done => {
      let fn: jest.Mock = jest.fn();
      let testFn: () => void = debounce(fn, 50)
      testFn()
      testFn()
      testFn()
      assert.strictEqual(fn.mock.instances.length, 0)
      setTimeout(() => {
        assert.strictEqual(fn.mock.instances.length, 0)
      }, 20)
      setTimeout(() => {
        assert.strictEqual(fn.mock.instances.length, 1)
        done();
      }, 55);
    })
    it('执行最后一次', done => {
      let testData: number = 0;
      let testFn: (data: number) => void = debounce((data: number) => {
        testData = data
      }, 50)
      testFn(1);
      testFn(2);
      testFn(3);
      setTimeout(() => {
        assert.strictEqual(testData, 3);
        done();
      }, 55);
    })
  })
  // formDate
  describe('formDate()', () => {
    const testTime = '2019/11/01 12:11:04'
    const testDate = new Date(testTime)
    it('参数为字符串,获取年月日季度', () => {
      assert.strictEqual(formDate(testTime, 'yyyy-MM-dd q'), '2019-11-01 4');
    })
    it('参数为Date,获取时分秒', () => {
      assert.strictEqual(formDate(testDate, 'hh:mm:ss'), '12:11:04');
    })
    it('参数为时间搓,获取年月日时分秒', () => {
      assert.strictEqual(formDate(testDate.getTime(), 'yyyy/MM/dd hh:mm:ss'), testTime);
    })
    it('获取当前时间', () => {
      assert.strictEqual(formDate(new Date(), 'yyyy/MM/dd hh:mm'), formDate('yyyy/MM/dd hh:mm'));
    })
  })
  // deepClone
  describe('deepClone()', () => {
    it('深拷贝', () => {
      let testObject: {a: number} = {
        a: 1
      }
      let testData: {a: number} = deepClone<{a: number}>(testObject);
      testData.a = 2
      assert.notStrictEqual(testObject, testData)
      assert.notStrictEqual(testObject.a, testData.a)
    })
  })
})
