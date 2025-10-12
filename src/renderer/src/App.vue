<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useTheme } from '@renderer/composables/theme'
import '@renderer/assets/global.css'

useTheme()
</script>

<style scoped></style>
