<template>
  <div class="home-container">
    <header class="header">
      <h1 class="title">AI绘画教学助手</h1>
      <p class="subtitle">学习绘画，从分析名作开始</p>
    </header>

    <div class="quick-actions">
      <el-button type="primary" size="large" @click="handleUpload">
        <el-icon><Upload /></el-icon>
        上传画作
      </el-button>
    </div>

    <div class="section">
      <h2 class="section-title">最近分析</h2>
      
      <div v-if="store.recentArtworks.length === 0" class="empty-card">
        <el-card class="empty-content">
          <p>还没有分析记录</p>
          <p class="empty-hint">上传一幅画作开始你的学习之旅吧！</p>
        </el-card>
      </div>

      <div v-else class="artwork-grid">
        <el-card 
          v-for="artwork in store.recentArtworks" 
          :key="artwork.id" 
          class="artwork-card"
          @click="handleArtworkClick(artwork)"
        >
          <img :src="artwork.imageUri" class="artwork-image" />
          <div class="card-content">
            <p class="artwork-title">{{ artwork.analysis?.style?.genre || '未分析' }}</p>
            <p class="artwork-date">{{ formatDate(artwork.createdAt) }}</p>
          </div>
        </el-card>
      </div>
    </div>

    <BottomNav active="home" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Upload } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import BottomNav from '@/components/BottomNav.vue'
import type { Artwork } from '@/types'

const router = useRouter()
const store = useAppStore()

onMounted(() => {
  store.loadArtworks()
})

function handleUpload() {
  router.push('/analysis')
}

function handleArtworkClick(artwork: Artwork) {
  store.setCurrentArtwork(artwork)
  if (artwork.analysis) {
    router.push(`/analysis/${artwork.id}`)
  } else {
    router.push('/analysis')
  }
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('zh-CN')
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
}

.header {
  padding: 40px 20px 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.quick-actions {
  padding: 0 20px 20px;
}

.section {
  padding: 0 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.empty-card {
  margin-bottom: 16px;
}

.empty-content {
  text-align: center;
  padding: 40px 20px;
  
  p {
    margin: 0 0 8px;
    color: #666;
  }
  
  .empty-hint {
    font-size: 14px;
    color: #999;
  }
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.artwork-card {
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

.artwork-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.card-content {
  padding: 12px;
}

.artwork-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.artwork-date {
  font-size: 12px;
  margin: 0;
  color: #999;
}
</style>