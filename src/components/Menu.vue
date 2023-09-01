<script setup lang="ts">
import router, {menuRouter} from '@/router/index'

const menu = reactive(menuRouter)

const currentRoute = (location.pathname).includes('trend') ? '/trending' : '/'

const menuSelect = (key: RouteLocationRaw) => {
  router.push(key)
}

</script>

<template>
  <div class="menu">
    <a-menu mode="horizontal"  :default-selected-keys="[currentRoute]" class="menu-box" @menu-item-click="menuSelect">
      <a-menu-item v-for="item in menu" :key="item.path" class="menu-item">
          {{$t(item.name)}}
      </a-menu-item>
    </a-menu>
  </div>

</template>

<style scoped>
  .menu {
    box-sizing: border-box;
    width: 300px;
  }

</style>