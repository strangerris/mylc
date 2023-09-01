<script setup lang="ts">
import {useSystemStore} from "@/stores/system";

import KnightUrl from '/Knight_lg.png'
import GuardianUrl from '/Guardian_lg.png'

const system = useSystemStore()
const {lcTitle} = storeToRefs(system)

const changeImg = () => {
  if (lcTitle.value.includes('Gua')) {
    lcTitle.value = KnightUrl
  }else {
    lcTitle.value = GuardianUrl
  }
  localStorage.setItem('lcTitle',lcTitle.value)
}
</script>

<template>
  <a-image
      width="35"
      :src="lcTitle"
      :preview="false"
     @click="changeImg()"
  />
</template>

<style scoped>

</style>