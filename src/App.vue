<script setup lang="ts">
import FooterComponent from './layout/ui/FooterComponent.vue'
import HeaderComponent from './layout/ui/HeaderComponent.vue'
import Toast from 'primevue/toast';
</script>

<template>
  <HeaderComponent class="col-12" />
  <RouterView />
  <FooterComponent class="col-12" />
  <Toast />
</template>
