# Linked List (链表)

## 简介
链表（Linked List）是一种线性数据结构，其中的元素不是存储在连续的内存位置，而是通过节点（Node）中的指针链接在一起。每个节点包含数据部分和指向下一个节点的引用（指针）。

本目录实现了单向链表（Singly Linked List），支持泛型数据存储和自定义比较逻辑。

## 目录结构
```text
src/data-structures/linked-list/
├── LinkedList.ts       # 链表核心类实现
├── LinkedListNode.ts   # 链表节点类实现
└── __test__/           # 单元测试目录
```

## 功能特性

### 1. 基础数据结构
*   **节点 (LinkedListNode)**:
    *   存储任意类型的值 (`value`)。
    *   包含指向下一个节点的指针 (`next`)。
    *   支持自定义 `toString` 方法，方便调试和展示。
*   **链表 (LinkedList)**:
    *   维护 `head` (头节点) 和 `tail` (尾节点) 指针，支持 O(1) 的尾部追加操作。
    *   内置 `Comparator` (比较器)，支持灵活的值比较策略（默认全等比较，可自定义）。

### 2. 支持的操作

#### 添加/插入
*   **`append(value)`**: 在链表**尾部**添加新节点。
    *   时间复杂度: O(1)
*   **`prepend(value)`**: 在链表**头部**添加新节点。
    *   时间复杂度: O(1)
*   **`insert(value, rawIndex)`**: 在指定**索引位置**插入新节点。
    *   支持负索引（视为头部插入）。
    *   支持索引越界（自动追加到尾部）。
    *   时间复杂度: O(n)

#### 删除
*   **`delete(value)`**: 删除链表中**所有**匹配该值的节点。
    *   如果链表中有多个相同的值，会全部删除。
    *   正确维护 `head` 和 `tail` 指针（即使删除的是头或尾，或链表变空）。
    *   返回最后一个被删除的节点。
    *   时间复杂度: O(n)

#### 查找
*   **`find({ value, callback })`**: 查找链表中符合条件的第一个节点。
    *   **按值查找**: 传入 `value`，使用内置比较器判断相等。
    *   **按回调查找**: 传入 `callback` 函数，返回 `true` 的节点即为目标。
    *   **优先级**: 如果同时传入，`callback` 优先于 `value`。
    *   时间复杂度: O(n)

### 3. 高级特性
*   **自定义比较器 (Custom Comparator)**:
    *   构造 `LinkedList` 时可传入自定义比较函数 `(a, b) => number`。
    *   适用于复杂对象（如按 ID 比较对象）或特殊逻辑（如忽略大小写字符串比较）。
    *   影响 `delete` 和 `find` (按值查找) 的行为。
*   **链式调用**:
    *   `append`, `prepend`, `insert` 方法均返回链表实例本身，支持 `list.append(1).append(2)` 这种流畅的写法。

## 使用示例

```typescript
import { LinkedList } from './LinkedList';

// 1. 基础使用
const list = new LinkedList();
list.append(1).append(2).prepend(0); // 链表: 0 -> 1 -> 2

// 2. 查找
const node = list.find({ value: 1 }); // 返回值为 1 的节点

// 3. 删除
list.delete(1); // 链表: 0 -> 2

// 4. 自定义比较器（对象存储）
const compareById = (a, b) => {
    if (a.id === b.id) return 0;
    return a.id < b.id ? -1 : 1;
};

const objList = new LinkedList(compareById);
objList.append({ id: 1, name: 'Alice' });
objList.append({ id: 2, name: 'Bob' });

// 即使引用不同，也能根据 id 找到或删除
objList.delete({ id: 1 }); // 删除 id 为 1 的节点
```
