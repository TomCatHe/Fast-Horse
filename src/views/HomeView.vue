<template>
  <a-layout>
    <!-- <a-layout-header :style="headerStyle">Header</a-layout-header> -->
    <a-layout>
<!--      <Sider></Sider>-->
      <ContentList></ContentList>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Sider from '@/components/Sider.vue'
import Content from '@/components/Content.vue';
import ContentList from '@/components/ContentList.vue';

</script>

<style scoped></style>
