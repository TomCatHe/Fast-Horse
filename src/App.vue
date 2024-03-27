<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#177bff',
      wireframe: true,
    },
  }">
  </a-config-provider>
  <HomeView></HomeView>
</template>

<script lang="ts" setup>
import HomeView from '@/views/HomeView.vue'

</script>

<style></style>
