import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import { AntDesignResolver } from './build/resolvers/antd'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    plugins: [
        react(),
        AutoImport({
            imports: ['react'],
            dts: './src/types/auto-imports.d.ts',
            resolvers: [
                // 使用我自己编写的解析器，处理antd的组件
                AntDesignResolver({
                    resolveIcons: true
                })
            ]
        })
    ]
})
