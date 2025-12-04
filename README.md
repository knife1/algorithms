# Algorithms 🚀

> 一个专注于前端开发者的算法学习与实践仓库。使用 **TypeScript** 实现，配备 **Vite** 构建系统与 **Vitest** 单元测试。

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/knife1/algorithms)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/knife1/algorithms)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

## 🎯 项目目标

本项目的核心目标是为前端开发者提供一个标准化的算法和数据结构学习环境。通过亲手实现经典算法，加强对计算机科学基础的理解。

特点：
*   ✨ **TypeScript**: 全类型覆盖，享受强类型的安全感。
*   ⚡ **Vite**: 极速的构建与开发体验。
*   🧪 **Vitest**: 现代化的单元测试框架，确保代码正确性。
*   📦 **Library Mode**: 按照标准库模式构建，代码可复用。

## 🛠️ 技术栈

*   **语言**: [TypeScript](https://www.typescriptlang.org/) (Target: ESNext)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **测试框架**: [Vitest](https://vitest.dev/)
*   **覆盖率工具**: [@vitest/coverage-v8](https://vitest.dev/guide/coverage.html)

## 🏗️ 目录结构

```text
algorithms/
├── src/
│   ├── algorithms/        # 算法实现 (排序, 搜索等) - 🚧 规划中
│   ├── data-structures/   # 数据结构实现
│   │   └── linked-list/   # 链表实现示例
│   └── index.ts           # 库入口文件
├── __test__/              # (可选) 统一测试目录，目前测试文件位于各源码目录下
├── coverage/              # 测试覆盖率报告
├── dist/                  # 构建产物
└── vite.config.ts         # Vite 配置
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/knife1/algorithms.git
cd algorithms
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行测试

我们强制要求为每个算法实现编写测试用例。

```bash
# 运行所有测试
npm run test

# 监听模式（开发时推荐）
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

### 4. 构建项目

如果你想将此项目打包为库使用：

```bash
npm run build
```

## 📚 已实现内容

### 数据结构 (Data Structures)

*   [x] **Linked List (链表)**
    *   `append(value)`: 在尾部添加节点
    *   `prepend(value)`: 在头部添加节点
    *   *(更多方法持续完善中...)*

### 算法 (Algorithms)

*   *(🚧 待添加: 冒泡排序, 二分查找, 快速排序等)*

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！在贡献代码时，请遵循以下规范：

1.  **目录规范**:
    *   数据结构放入 `src/data-structures/`
    *   算法放入 `src/algorithms/`
2.  **文件命名**: 使用 PascalCase (如 `LinkedList.ts`, `BinarySearch.ts`)。
3.  **测试驱动**: 每个新功能必须包含对应的 `*.test.ts` 文件，并确保覆盖率达标。
4.  **提交信息**:
    *   推荐运行 `npm run commit` 使用项目配置的简化版交互式工具进行提交。
    *   若手动提交，请严格遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。
    *   **注意**: `type: subject` 格式中，冒号后面必须有一个空格 (例如: `feat: add binary search`)。

## 📝 License

ISC
