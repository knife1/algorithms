import { LinkedList } from "../LinkedList.js";

describe('LinkedList', () => {
  // 测试向链表追加节点的功能
  it('should append node to linked list', () => {
    const linkedList = new LinkedList();

    // 初始状态，head 和 tail 都应为空
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    // 追加两个节点
    linkedList.append(1);
    linkedList.append(2);

    // 验证 head 和 tail 是否已定义
    expect(linkedList.head).toBeDefined();
    expect(linkedList.tail).toBeDefined();
    // 验证 head 的下一个节点的值
    expect(linkedList.head?.next?.value).toBe(2);
    // 验证 tail 节点的值
    expect(linkedList.tail?.value).toBe(2);
  });

  // 验证 append 方法是否支持链式调用
  it('should be chainable', () => {
    const linkedList = new LinkedList();
    expect(linkedList.append(1)).toBe(linkedList);
  });

  // 测试向空链表前置节点的功能
  it('should prepend node to empty linked list', () => {
    const linkedList = new LinkedList();

    // 前置一个节点
    linkedList.prepend(1);

    // 验证 head 和 tail 的值
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(1);
    // 验证 head 和 tail 是否指向同一个节点
    expect(linkedList.head).toBe(linkedList.tail);
    // 验证 head 的下一个节点是否为空
    expect(linkedList.head?.next).toBeNull();
  });

  // 测试向非空链表前置节点的功能
  it('should prepend node to non-empty linked list', () => {
    const linkedList = new LinkedList();

    // 初始追加一个节点，链表为：2
    linkedList.append(2);
    expect(linkedList.head?.value).toBe(2);
    expect(linkedList.tail?.value).toBe(2);

    // 前置一个节点，链表变为：1 -> 2
    linkedList.prepend(1);

    // 验证 head 的值
    expect(linkedList.head?.value).toBe(1);
    // 验证 head 的下一个节点的值
    expect(linkedList.head?.next?.value).toBe(2);
    // 验证 tail 的值
    expect(linkedList.tail?.value).toBe(2);
    // 验证 tail 的下一个节点是否为空
    expect(linkedList.tail?.next).toBeNull();
  });

  // 验证 prepend 方法是否支持链式调用
  it('should be chainable when prepending', () => {
    const linkedList = new LinkedList();
    expect(linkedList.prepend(1)).toBe(linkedList);
  });
});


