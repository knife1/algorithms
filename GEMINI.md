## Gemini Added Memories
- The user prefers the domain "global" for future interactions.
# Instruction
- Please output all conversations related to the Gemini CLI in Simplified Chinese.

# 项目概览
这是一个专注于前端开发者的算法学习与实践仓库。使用 **TypeScript** 实现，配备 **Vite** 构建系统与 **Vitest** 单元测试。

# 技术栈
*   **语言**: TypeScript
*   **构建工具**: Vite
*   **测试框架**: Vitest

# 目录结构
```text
algorithms/
├── src/
│   ├── algorithms/        # 算法实现
│   ├── data-structures/   # 数据结构实现
│   └── index.ts           # 库入口文件
```

# 开发规范

## 命名规范
*   **文件命名**: 使用 PascalCase (如 `LinkedList.ts`, `BinarySearch.ts`)。

## 测试驱动 (TDD)
*   每个新功能必须包含对应的 `*.test.ts` 文件。
*   确保测试覆盖率达标。

## 提交信息
*   推荐使用 `npm run commit` (交互式工具)。
*   手动提交必须遵循 Conventional Commits 规范 (例如: `feat: add binary search`)，**注意冒号后需要空格**。

# 常用命令
*   运行测试: `npm run test`
*   生成覆盖率: `npm run test:coverage`
*   构建项目: `npm run build`