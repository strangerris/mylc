<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {useSystemStore} from "@/stores/system";
const system = useSystemStore()

</script>

<template>
  <a-dropdown trigger="hover" @select="system.switchLang" >
    <a-button type="text" style="color:var(--color-text-1)">
      <template #icon>
        <Icon icon="material-symbols:language"/>
      </template>
    </a-button>
    <template #content >
      <a-doption value="ZH">简体中文</a-doption>
      <a-doption value="EN">English</a-doption>
    </template>
  </a-dropdown>
</template>

<style scoped>

</style>