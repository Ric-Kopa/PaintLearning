<template>
  <nav class="bottom-nav">
    <button 
      class="nav-item" 
      :class="{ active: active === 'home' }"
      @click="$router.push('/')"
    >
      <el-icon size="24"><HomeFilled /></el-icon>
      <span>首页</span>
    </button>
    <button 
      class="nav-item" 
      :class="{ active: active === 'history' }"
      @click="$router.push('/history')"
    >
      <el-icon size="24"><List /></el-icon>
      <span>历史</span>
    </button>
    <button 
      class="nav-item" 
      :class="{ active: active === 'settings' }"
      @click="$router.push('/settings')"
    >
      <el-icon size="24"><Menu /></el-icon>
      <span>设置</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { HomeFilled, List, Menu } from '@element-plus/icons-vue'

defineProps<{
  active: string
}>()
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 12px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
  transition: all 0.3s;
  
  span {
    font-size: 12px;
  }
  
  &.active {
    color: #409eff;
  }
  
  &:hover {
    color: #409eff;
  }
}
</style>