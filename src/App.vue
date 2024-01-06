<script setup lang="ts">
import FooterComponent from './layout/ui/FooterComponent.vue'
import HeaderComponent from './layout/ui/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>
