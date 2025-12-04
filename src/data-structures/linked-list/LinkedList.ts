import { LinkedListNode } from "./LinkedListNode.js";
export class LinkedList {
    head: LinkedListNode | null;
    tail: LinkedListNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
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
}