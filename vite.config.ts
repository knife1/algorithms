/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'], // 移除 console 和 debugger
    legalComments: 'inline', // 只保留版权相关注释
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Algorithms',
      fileName: 'algorithms',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        // 移除所有注释（包括 JSDoc 注释）
        // 保留版权声明注释可用：'some'
        // 移除所有注释：'none' 或 false
        banner: '', // 清除顶部 banner
      },
    },
    // 使用 terser 压缩（terser 默认移除所有注释）
    minify: 'terser',
    terserOptions: {
      // 压缩选项：移除 console 和 debugger
      compress: {
        drop_console: true,  // 移除 console.log 等调试语句
        drop_debugger: true, // 移除 debugger 语句
      },
      // 格式选项：移除所有注释（包括 JSDoc 注释）
      format: {
        comments: false,     // 移除所有注释
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    // 显式指定：只扫描 __test__ 目录下的测试文件
    include: ['**/__test__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/__test__/**', 'src/**/*.d.ts', 'src/index.ts'],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});