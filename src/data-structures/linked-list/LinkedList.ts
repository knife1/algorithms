import { LinkedListNode } from "./LinkedListNode.js";
import { Comparator } from '../../utils/comparator/comparator';
export class LinkedList {
    head: LinkedListNode | null;
    tail: LinkedListNode | null;
    private comparator: Comparator;

    constructor(comparatorFunction?: (a: any, b: any) => number) {
        this.head = null;
        this.tail = null;
        this.comparator = new Comparator(comparatorFunction);
    }
    /**
     * 添加元素到链表尾部
     * @param value 添加到链表的元素
     * @returns 链表实例
     */
    append(value: any) {
        const newNode = new LinkedListNode(value);
        // 防止链表为空时，head为null
        if (!this.head) {
          this.head = newNode;
          this.tail = newNode;
          return this;
        }
        this.tail!.next = newNode;
        this.tail = newNode;
        return this;
    }
    /**
     * 添加元素到链表头部
     * @param value  添加到链表的元素
     * @returns 链表实例
     */
    prepend(value: any) {
      const newNode = new LinkedListNode(value, this.head);
      this.head = newNode;
      // 防止链表为空
      if (!this.tail) {
        this.tail = newNode;
      }
      return this;
    }
    /**
     * 在指定位置插入元素
     * @param value 插入的元素
     * @param rawIndex 插入的位置
     * @returns 链表实例
     */
    insert(value: any, rawIndex: number) {
      if (rawIndex <= 0) {
        return this.prepend(value);
      }
      const newNode = new LinkedListNode(value);
      let currentNode = this.head;
      let count = 1;
      while(currentNode) {
        if (count === rawIndex) break;
        currentNode = currentNode.next;
        count ++;
      }
      if (currentNode && currentNode.next !== null) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        this.append(value);
      }
      return this;
    }
    /**
     * 删除链表中某个值
     * @param value 删除的值
     * @returns 删除的节点或null
     */
    // delete(value: any):LinkedListNode|null {
    //   let currentNode = this.head;
    //   return currentNode;
    // }
    /**
     * 查找链表中是否包含某个值
     * @param {value, callback} value: 要查找的值, callback: 回调函数
     * @returns {LinkedListNode | null} 找到的节点或null
     */
    find({value = undefined, callback}:{value?:any, callback?: (value: any) => boolean}):LinkedListNode | null {
      let currentNode = this.head;
      while(currentNode) {
        if (callback && callback(currentNode.value)) {
          return currentNode;
        }
        if (value !== undefined && this.comparator.equal(currentNode.value, value)) {
          return currentNode;
        }
        currentNode = currentNode.next;
      }
      return null;
    }
}