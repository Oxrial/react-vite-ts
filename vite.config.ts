import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import { AntDesignResolver } from './build/resolvers/antd'

// https://vitejs.dev/config/
export default defineConfig({
    server: { port: 5090, host: '0.0.0.0' },
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
                // \处理antd的组件
                AntDesignResolver({
                    resolveIcons: true
                })
            ]
        })
    ]
})
