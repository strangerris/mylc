<script setup lang="ts">
import {Icon} from '@iconify/vue'
import {useSystemStore} from "@/stores/system";
const system = useSystemStore()
const {theme} = storeToRefs(system)

</script>

<template>
  <a-button class="theme" style="color:var(--color-text-1)" type="text" @click="system.switchTheme">
    <template #icon>
        <Icon v-if="theme === 'dark'" icon="material-symbols:dark-mode"/>
        <Icon v-else icon="material-symbols:light-mode"/>
    </template>
  </a-button>
</template>

<style scoped>

</style>