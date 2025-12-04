import { LinkedListNode } from "../LinkedListNode.js";

describe('LinkedListNode', () => {
    // 测试 LinkedListNode 的基本创建功能，验证 value 和 next 的初始状态
    it('should create a new LinkedListNode', () => {
        const node = new LinkedListNode(1);
        expect(node.value).toBe(1);
        expect(node.next).toBeNull();
    });

    // 测试 LinkedListNode 能够存储对象作为其值
    it("should create list node with object as a value", () => {
      const nodeValue = { value: 1, key: 'test' };
      const node = new LinkedListNode(nodeValue);
      expect(node.value.value).toBe(1);
      expect(node.value.key).toBe("test");
      expect(node.next).toBeNull();
    })

    // 测试 LinkedListNode 的 toString 方法在没有提供回调函数时的行为
    it("should convert node to string", () => {
      const node = new LinkedListNode("1");
      expect(node.toString()).toBe("1");
      node.value = "test";
      expect(node.toString()).toBe("test");
    })

    // 测试 LinkedListNode 之间的连接功能，验证 next 指针的正确性
    it("should link nodes together", () => {
      const node1 = new LinkedListNode(1);
      const node2 = new LinkedListNode(2, node1);
      expect(node2.next).toBeDefined();
      expect(node1.next).toBeNull();
      expect(node2.value).toBe(2);
      expect(node2.next!.value).toBe(1);
    })

    // 测试 LinkedListNode 的 toString 方法在提供自定义回调函数时的行为
    it("should convert node to string with custom stringifier", () => {
      const nodeValue = {value: 1, key: "test"};
      const node = new LinkedListNode(nodeValue);
      const toStringCallback = (value: any) => {
        return `value: ${value.value}, key: ${value.key}`
      }
      expect(node.toString(toStringCallback)).toBe("value: 1, key: test");
    })
});

