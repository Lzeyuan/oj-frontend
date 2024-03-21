<template>
  <div id="code-editor" ref="monacoEditorRef" style="width: 100%; height: 300px"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref, toRaw } from 'vue'
import '@/plugins/userWorker'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const monacoEditor = ref()
const monacoEditorRef = ref()

interface Props {
  editValue?: string
  language?: string
  handleChange?: (v: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  editValue: () => '',
  language: () => 'typescript',
  handleChange: (v: string) => {
    console.log(v)
  }
})

onMounted(() => {
  monacoEditor.value = monaco.editor.create(monacoEditorRef.value, {
    theme: 'vs-dark', // 主题
    value: props.editValue, // 默认显示的值
    language: 'typescript',
    folding: true, // 是否折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: 'indentation', // 折叠方式  auto | indentation
    showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5 // 行号最小字符   number
  })

  monacoEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(monacoEditor.value).getValue())
  })
})
</script>

<style scoped></style>
