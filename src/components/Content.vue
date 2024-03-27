<template>
  <div>
    <pre>{{ fileContent }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const fileContent = ref('');

let readFile = async () => {
  try {
    const data = await window.electronAPI.readFileContent("C:\\Users\\hecke\\Desktop\\testnodejs\\usp_pay_except_new.sql");
    fileContent.value = data.toString();
  } catch (error) {
    console.error("读取文件时出错：", error);
  }
}
onMounted(() => {
  readFile()
})

</script>

<style scoped></style>
