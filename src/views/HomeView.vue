<template>
  <div id="home-view">
    <MdEditor />
    <CodeEditor :edit-value="test" :handle-change="codeEditorhandleChange" />
    <!--eslint-disable-next-line-->
    <div v-for="item in 10">
      <div>{{ item }} {{ test }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue'
import MdEditor from '@/components/MdEditor.vue'
import { ref, watch } from 'vue'

const test = ref("console.log('hello world')")

watch(test, (newValue, oldValue) => {
  console.log('newValue:', newValue)
  console.log('oldValue:', oldValue)
})

const codeEditorhandleChange = (v: string) => {
  test.value = v
  console.log('v:', v)
}
</script>
