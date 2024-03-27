<template>
  <a-layout>
    <!-- <a-layout-header :style="headerStyle">Header</a-layout-header> -->
    <a-layout>
      <Sider></Sider>
      <Content></Content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Sider from '@/components/Sider.vue'
import Content from '@/components/Content.vue';

</script>

<style scoped></style>
