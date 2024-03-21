<template>
  <div id="addQuestionView">
    <a-form :model="form">
      <a-form-item field="answer" label="答案">
        
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  answer: '暴力破解',
  content: '题目内容',
  judgeCase: [{ input: '1 2', output: '3 4' }],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000
  },
  tags: ['栈', '简单'],
  title: 'A + B'
})
</script>

<style scoped></style>
