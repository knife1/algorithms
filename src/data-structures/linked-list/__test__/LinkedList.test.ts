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
  // 测试 find 方法
  describe('find', () => {
    let linkedList: LinkedList;

    beforeEach(() => {
      linkedList = new LinkedList();
      linkedList.append(1).append(2).append(3).append(4); // 链表: 1 -> 2 -> 3 -> 4
    });

    // 1. 基础查找 (By Value)
    it('should find a node by its value', () => {
      // 场景: 链表中存在目标值
      const node = linkedList.find({ value: 3 });
      expect(node).not.toBeNull();
      expect(node?.value).toBe(3);
    });

    it('should return null if value not found', () => {
      // 场景: 链表中不存在目标值
      const node = linkedList.find({ value: 5 });
      expect(node).toBeNull();
    });

    // 2. 回调查找 (By Callback)
    it('should find a node by callback function', () => {
      // 场景: 使用回调函数查找符合条件的节点 (例如: 查找第一个偶数)
      const node = linkedList.find({ callback: (val: number) => val % 2 === 0 });
      expect(node).not.toBeNull();
      expect(node?.value).toBe(2);
    });

    it('should return null if callback condition is not met', () => {
      // 场景: 回调函数条件都不满足 (例如: 查找大于100的数)
      const node = linkedList.find({ callback: (val: number) => val > 100 });
      expect(node).toBeNull();
    });

    // 3. 优先级测试 (Callback vs Value)
    it('should prioritize callback over value if both are provided', () => {
      // 场景: 同时传入 value 和 callback，且 callback 优先
      // 链表: 1 -> 2 -> 3 -> 4
      // 传入 value: 3, callback: (val) => val === 1
      const node = linkedList.find({ value: 3, callback: (val: number) => val === 1 });
      expect(node).not.toBeNull();
      expect(node?.value).toBe(1); // 期望返回1，因为 callback 优先
    });

    // 4. 边界测试
    it('should return null when finding in an empty list', () => {
      // 场景: 在空链表上调用 find
      const emptyList = new LinkedList();
      const nodeByValue = emptyList.find({ value: 1 });
      const nodeByCallback = emptyList.find({ callback: (val: number) => val === 1 });
      expect(nodeByValue).toBeNull();
      expect(nodeByCallback).toBeNull();
    });

    it('should find the head node', () => {
      // 场景: 查找 head (头节点)
      const node = linkedList.find({ value: 1 });
      expect(node).toBe(linkedList.head);
    });

    it('should find the tail node', () => {
      // 场景: 查找 tail (尾节点)
      const node = linkedList.find({ value: 4 });
      expect(node).toBe(linkedList.tail);
    });

    // 5. 复杂类型支持 (Objects)
    it('should find an object by reference', () => {
      const obj1 = { id: 1, name: 'Alice' };
      const obj2 = { id: 2, name: 'Bob' };
      const obj3 = { id: 3, name: 'Charlie' };

      const objLinkedList = new LinkedList();
      objLinkedList.append(obj1).append(obj2).append(obj3);

      const foundNode = objLinkedList.find({ value: obj2 });
      expect(foundNode).not.toBeNull();
      expect(foundNode?.value).toBe(obj2);
    });

    it('should find an object by callback based on property', () => {
      const obj1 = { id: 1, name: 'Alice' };
      const obj2 = { id: 2, name: 'Bob' };
      const obj3 = { id: 3, name: 'Charlie' };

      const objLinkedList = new LinkedList();
      objLinkedList.append(obj1).append(obj2).append(obj3);

      const foundNode = objLinkedList.find({ callback: (item: any) => item.name === 'Bob' });
      expect(foundNode).not.toBeNull();
      expect(foundNode?.value).toBe(obj2);
    });

    it('should find an object using a custom comparator function passed to constructor', () => {
        const comparatorFunction = (a: any, b: any) => {
            if (a.id === b.id) {
                return 0;
            }
            return a.id < b.id ? -1 : 1;
        };

        const obj1 = { id: 1, name: 'Alice' };
        const obj2 = { id: 2, name: 'Bob' };
        
        const linkedList = new LinkedList(comparatorFunction);
        linkedList.append(obj1).append(obj2);

        // 使用自定义比较器，即使传入的对象只有 id 属性且引用不同，也应该能找到
        const searchObj = { id: 2, name: 'Different Name' };
        const node = linkedList.find({ value: searchObj });

        expect(node).not.toBeNull();
        expect(node?.value).toBe(obj2);
    });
  });

  // 测试 insert 方法
  describe('insert', () => {
    let linkedList: LinkedList;
    let emptyList: LinkedList;

    beforeEach(() => {
      // 为了测试中间插入等场景，初始化一个非空链表
      linkedList = new LinkedList();
      linkedList.append(1).append(3).append(4); // 链表: 1 -> 3 -> 4
      emptyList = new LinkedList();
    });

    // 1. 插入到链表头部 (index <= 0)
    it('should insert a node at the beginning of the linked list (index 0)', () => {
      // 场景: 在非空链表头部 (index = 0) 插入节点。
      // 期望: 新节点成为 head，原 head 成为新节点的 next。
      linkedList.insert(0, 0); // 链表: 0 -> 1 -> 3 -> 4
      expect(linkedList.head?.value).toBe(0);
      expect(linkedList.head?.next?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(4); // tail 保持不变
    });

    it('should insert a node at the beginning if index is less than 0', () => {
      // 场景: index 小于 0 时 (例如 -5)，应视为 index = 0 插入到头部。
      // 期望: 新节点成为 head，原 head 成为新节点的 next。
      linkedList.insert(-1, -5); // 链表: -1 -> 1 -> 3 -> 4
      expect(linkedList.head?.value).toBe(-1);
      expect(linkedList.head?.next?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(4);
    });

    it('should insert into an empty list at index 0', () => {
      // 场景: 向空链表插入节点，index = 0。
      // 期望: 新节点同时成为 head 和 tail。
      emptyList.insert(10, 0); // 链表: 10
      expect(emptyList.head?.value).toBe(10);
      expect(emptyList.tail?.value).toBe(10);
      expect(emptyList.head).toBe(emptyList.tail);
    });

    // 2. 插入到链表中间
    it('should insert a node in the middle of the linked list', () => {
      // 场景: 在链表中间位置插入 (例如链表 1->3->4，在 index 1 插入 2)。
      // 期望: 节点正确插入，前后连接关系正确。
      linkedList.insert(2, 1); // 链表: 1 -> 2 -> 3 -> 4
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.head?.next?.value).toBe(2);
      expect(linkedList.head?.next?.next?.value).toBe(3);
      expect(linkedList.tail?.value).toBe(4);
    });

    // 3. 插入到链表尾部 (index 等于链表长度)
    it('should insert a node at the exact end of the linked list (index = length)', () => {
      // 场景: 在链表末尾 (index 等于当前链表长度 3) 插入节点。
      // 期望: 新节点成为 tail，原 tail 指向新节点。
      linkedList.insert(5, 3); // 链表: 1 -> 3 -> 4 -> 5
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(5);
      expect(linkedList.tail?.next).toBeNull();
      // 确保原 tail 的 next 指向新节点
      let currentNode = linkedList.head;
      while(currentNode?.next) {
        currentNode = currentNode.next;
      }
      expect(currentNode?.value).toBe(5);
    });

    // 4. 索引越界处理 (Index > Length) - 追加到末尾
    it('should append node to the end if index is greater than list length', () => {
      // 场景: index 远大于链表长度 (例如链表长度 3，插入到 index 10)。
      // 期望: 节点追加到链表末尾。
      linkedList.insert(100, 10); // 链表: 1 -> 3 -> 4 -> 100
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(100);
      expect(linkedList.tail?.next).toBeNull();
    });

    // 5. 链式调用
    it('should be chainable when inserting', () => {
      // 场景: 验证 insert 方法是否支持链式调用。
      // 期望: 返回链表实例本身。
      expect(emptyList.insert(1, 0)).toBe(emptyList);
      expect(emptyList.head?.value).toBe(1);
    });
  });

  // 测试 delete 方法
  describe('delete', () => {
    let linkedList: LinkedList;

    beforeEach(() => {
      linkedList = new LinkedList();
    });

    it('should return null when deleting a non-existent value', () => {
      // 场景: 删除一个链表中不存在的值 (例如: 链表 1->2->3, 删除 5)
      // 期望: 返回 null，且链表结构保持不变 (head=1, tail=3)
      linkedList.append(1).append(2).append(3);
      const deletedNode = linkedList.delete(5);
      expect(deletedNode).toBeNull();
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(3);
    });

    it('should delete the node from the head', () => {
      // 场景: 删除链表头部的节点 (例如: 链表 1->2->3, 删除 1)
      // 期望: 返回被删除的节点(1)，head 更新为原第二个节点(2)，且 head.next 正确指向 3
      linkedList.append(1).append(2).append(3);
      const deletedNode = linkedList.delete(1);
      expect(deletedNode?.value).toBe(1);
      expect(linkedList.head?.value).toBe(2);
      expect(linkedList.head?.next?.value).toBe(3);
    });

    it('should delete multiple nodes from the head', () => {
      // 场景: 链表头部有连续多个待删除节点 (例如: 链表 1->1->2, 删除 1)
      // 期望: 返回最后被删除的那个 1，head 更新为第一个非匹配节点(2)
      linkedList.append(1).append(1).append(2);
      const deletedNode = linkedList.delete(1);
      expect(deletedNode?.value).toBe(1);
      expect(linkedList.head?.value).toBe(2);
    });

    it('should delete the node from the tail', () => {
      // 场景: 删除链表尾部的节点 (例如: 链表 1->2->3, 删除 3)
      // 期望: 返回被删除的节点(3)，tail 更新为原倒数第二个节点(2)，且新 tail.next 为 null
      linkedList.append(1).append(2).append(3);
      const deletedNode = linkedList.delete(3);
      expect(deletedNode?.value).toBe(3);
      expect(linkedList.tail?.value).toBe(2);
      expect(linkedList.tail?.next).toBeNull();
    });

    it('should delete the node from the middle', () => {
      // 场景: 删除链表中间的节点 (例如: 链表 1->2->3, 删除 2)
      // 期望: 返回被删除的节点(2)，head.next 跳过 2 直接指向 3
      linkedList.append(1).append(2).append(3);
      const deletedNode = linkedList.delete(2);
      expect(deletedNode?.value).toBe(2);
      expect(linkedList.head?.next?.value).toBe(3);
    });

    it('should delete multiple nodes with the same value', () => {
      // 场景: 链表中有多个分散的待删除节点 (例如: 链表 1->2->1->3->1, 删除 1)
      // 期望: 返回最后被删除的节点(1)，剩余链表为 2->3，tail 正确指向 3
      linkedList.append(1).append(2).append(1).append(3).append(1);
      const deletedNode = linkedList.delete(1);
      expect(deletedNode?.value).toBe(1);
      // 期望剩余链表: 2 -> 3
      expect(linkedList.head?.value).toBe(2);
      expect(linkedList.head?.next?.value).toBe(3);
      expect(linkedList.tail?.value).toBe(3);
    });

    it('should delete all nodes in the list', () => {
      // 场景: 删除链表中所有节点 (例如: 链表 1->1, 删除 1)
      // 期望: 返回被删除的节点，链表变为空 (head 和 tail 均为 null)
      linkedList.append(1).append(1);
      const deletedNode = linkedList.delete(1);
      expect(deletedNode?.value).toBe(1);
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
    });

    it('should handle empty list', () => {
      // 场景: 对空链表进行删除操作
      // 期望: 返回 null，不报错
      const deletedNode = linkedList.delete(1);
      expect(deletedNode).toBeNull();
    });

    it('should delete objects using custom comparator', () => {
      // 场景: 使用自定义比较器 (按 key 属性) 删除对象
      // 期望: 即使对象引用不同，只要 key 匹配就被删除。返回被删除的对象，剩余链表结构正确。
      const comparatorFunction = (a: any, b: any) => {
        if (a.key === b.key) return 0;
        return a.key < b.key ? -1 : 1;
      };
      const list = new LinkedList(comparatorFunction);
      
      const obj1 = { key: 'a', val: 1 };
      const obj2 = { key: 'b', val: 2 };
      
      list.append(obj1).append(obj2);

      const deletedNode = list.delete({ key: 'a' });
      expect(deletedNode?.value).toBe(obj1);
      expect(list.head?.value).toBe(obj2);
    });
  });
});


