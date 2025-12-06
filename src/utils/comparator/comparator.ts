export class Comparator {
  private compare: ((a: any, b: any) => number);
  /**
   * 比较器构造函数
   * @param comParaFunction 比较函数
   */
  constructor(comParaFunction: ((a: any, b: any) => number) | undefined) {
    this.compare = comParaFunction || this.defaultCompareFunction;
  }
  /**
   * 默认比较函数
   * @param a 比较的第一个值
   * @param b 比较的第二个值
   * @returns 比较结果，0表示相等，-1表示a小于b，1表示a大于b
   */
  defaultCompareFunction(a: any, b: any): number {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
  /**
   * 判断两个值是否相等
   * @param a 比较的第一个值
   * @param b 比较的第二个值
   * @returns 是否相等
   */
  equal(a: any, b: any): boolean {
    return this.compare(a, b) === 0;
  }
}