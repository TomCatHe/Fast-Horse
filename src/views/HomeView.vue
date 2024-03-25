<template>
  <a-layout>
    <a-layout-header :style="headerStyle">Header</a-layout-header>
    <a-layout>
      <Sider></Sider>
      <div id="abx">88888xxxxx</div>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Sider from '@/components/Sider.vue'
import { type CSSProperties } from 'vue';

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
</script>

<style scoped></style>
