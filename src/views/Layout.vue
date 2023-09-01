<script setup lang="ts">
</script>

<template>
  <a-layout class="layout">

    <a-layout-header>
      <!-- 顶部导航栏 -->
      <Navbar>
        <!-- 左侧Logo -->
        <template #left>
          <Logo />
        </template>

        <!-- 中间页面选项 -->
        <template #center>
          <Menu />
        </template>

        <!-- 右侧切换按钮 -->
        <template #right>
          <SwitchLanguage class="switch-button"/>

          <SwitchTheme class="switch-button"/>
        </template>
      </Navbar>

    </a-layout-header>
    
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.layout {
  background: var(--color-bg-2);
  min-height: 100vh;
}

.switch-button {
  color: var(--color-bg-2)
}
</style>