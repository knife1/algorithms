import { describe, it, expect } from 'vitest';
import { Comparator } from '../comparator';

describe('Comparator', () => {
  describe('Default Strategy', () => {
    it('应在默认比较器下正确判断数字的相等性', () => {
      const comparator = new Comparator(undefined);
      expect(comparator.equal(1, 1)).toBe(true); // 验证两个相同的数字是相等的
      expect(comparator.equal(0, 0)).toBe(true); // 验证零和零是相等的
      expect(comparator.equal(-1, -1)).toBe(true); // 验证两个相同的负数是相等的
      expect(comparator.equal(1, 2)).toBe(false); // 验证两个不同的数字是不相等的
    });

    it('应在默认比较器下正确判断字符串的相等性', () => {
      const comparator = new Comparator(undefined);
      expect(comparator.equal('a', 'a')).toBe(true); // 验证两个相同的字符串是相等的
      expect(comparator.equal('hello', 'hello')).toBe(true); // 验证两个相同的长字符串是相等的
      expect(comparator.equal('a', 'b')).toBe(false); // 验证两个不同的字符串是不相等的
    });

    it('应在默认比较器下正确处理不同类型值的比较', () => {
      const comparator = new Comparator(undefined);
      // @ts-ignore - 测试混合类型在运行时行为
      expect(comparator.equal(1, '1')).toBe(false); // 验证数字和字符串数字由于类型不同，被视为不相等
    });

    it('应在默认比较器下通过引用来比较对象', () => {
      const comparator = new Comparator(undefined);
      const obj1 = { a: 1 };
      const obj2 = { a: 1 };
      const obj3 = obj1;

      expect(comparator.equal(obj1, obj3)).toBe(true); // 验证相同引用对象（同一个对象）被视为相等
      expect(comparator.equal(obj1, obj2)).toBe(false); // 验证内容相同但引用不同的对象被视为不相等
    });

    it('应在默认比较器下正确处理 null 和 undefined 值的比较', () => {
      const comparator = new Comparator(undefined);
      expect(comparator.equal(null, null)).toBe(true); // 验证两个 null 值是相等的
      expect(comparator.equal(undefined, undefined)).toBe(true); // 验证两个 undefined 值是相等的
      expect(comparator.equal(null, undefined)).toBe(false); // 验证 null 和 undefined 是不相等的
    });
  });

  describe('Custom Strategy', () => {
    it('应使用自定义比较函数来判断字符串的长度相等性', () => {
      const compareLength = (a: string, b: string) => {
        if (a.length === b.length) return 0;
        return a.length < b.length ? -1 : 1;
      };
      const comparator = new Comparator(compareLength);

      expect(comparator.equal('a', 'b')).toBe(true); // 验证在自定义长度比较下，长度相同的字符串被视为相等
      expect(comparator.equal('a', 'aa')).toBe(false); // 验证在自定义长度比较下，长度不同的字符串被视为不相等
    });

    it('应使用自定义比较函数来判断对象的特定属性相等性', () => {
      const compareByAge = (a: { age: number }, b: { age: number }) => {
        if (a.age === b.age) return 0;
        return a.age < b.age ? -1 : 1;
      };
      const comparator = new Comparator(compareByAge);

      const person1 = { age: 20, name: 'Alice' };
      const person2 = { age: 20, name: 'Bob' };
      const person3 = { age: 21, name: 'Charlie' };

      expect(comparator.equal(person1, person2)).toBe(true); // 验证在自定义年龄比较下，年龄相同的对象被视为相等
      expect(comparator.equal(person1, person3)).toBe(false); // 验证在自定义年龄比较下，年龄不同的对象被视为不相等
    });
  });
});
