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
    delete(value: any):LinkedListNode|null {
      if (!this.head) {
        return null;
      }
      
      let deletedNode = null;
      // 头节点判断
      while(this.head && this.comparator.equal(this.head.value, value)) {
        deletedNode = this.head;
        this.head = this.head.next;
      }

      let currentNode = this.head;

      if (currentNode !== null) {
        // 如果链表不为空，遍历删除后续节点
        while(currentNode.next) {
          if (this.comparator.equal(currentNode.next.value, value)) {
            deletedNode = currentNode.next;
            currentNode.next = currentNode.next.next;
          } else {
            currentNode = currentNode.next;
          }
        }
      }
      
      // 更新 tail
      // 如果 head 为 null (链表空了)，tail 也应为 null
      // 如果 head 不为 null，此时 currentNode 指向最后一个节点 (因为 while 循环结束条件是 !currentNode.next)
      this.tail = currentNode;

      return deletedNode;
    }
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