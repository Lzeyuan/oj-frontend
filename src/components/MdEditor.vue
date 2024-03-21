<template>
  <div id="md-editor">
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
// 必须import而不是提示的type Editor
// @ts-ignore
import { Editor } from '@bytemd/vue-next'

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]

interface Props {
  value?: string
  handleChange?: (v: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  handleChange: (v: string) => {
    console.log(v)
  }
})
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
