<script setup lang="ts">

</script>

<template>
  <div class="nav">
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.nav {
  height: 60px;
  display: flex;

  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #666666;
}
.left {
  padding-left: 10px;
}

.right {
  display: flex;
  justify-content: space-between;
  width: 90px;
  padding: 10px;
  box-sizing: border-box;
}

</style>