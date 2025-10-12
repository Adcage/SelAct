<template>
  <div class="test">Hello</div>
  <a-button @click="theme.setTheme('dark')">切换</a-button>
</template>

<script lang="ts" setup>
import { useTheme } from '@renderer/composables/theme'

const theme = useTheme()
theme.setTheme('light')
</script>

<style scoped>
.test {
  background: var(--primary-color);
  height: 100vh;
  width: 100vw;
}
</style>
