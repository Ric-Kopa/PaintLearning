<template>
  <div class="history-container">
    <header class="header">
      <h1 class="title">学习历史</h1>
    </header>

    <div v-if="store.loading" class="loading-container">
      <el-loading-spinner size="large" />
    </div>

    <div v-else-if="store.artworks.length === 0" class="empty-state">
      <el-empty description="暂无学习记录" />
    </div>

    <div v-else class="artwork-list">
      <el-card 
        v-for="artwork in store.artworks" 
        :key="artwork.id" 
        class="artwork-item"
      >
        <div class="artwork-content">
          <img :src="artwork.imageUri" class="artwork-image" />
          <div class="artwork-info">
            <div class="artwork-header">
              <h3 class="artwork-title">{{ artwork.analysis?.style?.genre || '未分析' }}</h3>
              <button 
                class="favorite-btn"
                @click.stop="handleToggleFavorite(artwork.id)"
              >
                <el-icon :class="{ active: artwork.isFavorite }">
                  <Heart />
                </el-icon>
              </button>
            </div>
            <p class="artwork-date">{{ formatDate(artwork.createdAt) }}</p>
            <div class="artwork-tags">
              <span v-for="tag in artwork.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="artwork-actions">
              <el-button 
                v-if="artwork.analysis" 
                size="small" 
                @click="navigateToAnalysis(artwork.id)"
              >
                <el-icon><Search /></el-icon>
                查看分析
              </el-button>
              <el-button 
                v-if="artwork.tutorial" 
                size="small" 
                type="primary"
                @click="navigateToTutorial(artwork.id)"
              >
                <el-icon><BookOpen /></el-icon>
                查看教程
              </el-button>
              <el-button 
                size="small" 
                type="danger"
                @click="handleDelete(artwork.id)"
              >
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <BottomNav active="history" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Heart, Search, BookOpen, Delete } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const store = useAppStore()

onMounted(() => {
  store.loadArtworks()
})

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function handleToggleFavorite(id: string) {
  store.toggleFavorite(id)
}

function navigateToAnalysis(id: string) {
  store.loadArtworkById(id)
  router.push(`/analysis/${id}`)
}

function navigateToTutorial(id: string) {
  store.loadArtworkById(id)
  router.push(`/tutorial/${id}`)
}

function handleDelete(id: string) {
  store.deleteArtwork(id)
}
</script>

<style lang="scss" scoped>
.history-container {
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
  margin: 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
}

.empty-state {
  padding: 40px 20px;
}

.artwork-list {
  padding: 0 20px;
}

.artwork-item {
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.artwork-content {
  display: flex;
  gap: 16px;
}

.artwork-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.artwork-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.artwork-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.artwork-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #ddd;
  
  .el-icon {
    font-size: 20px;
    transition: color 0.3s;
  }
  
  .el-icon.active {
    color: #f56c6c;
  }
}

.artwork-date {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px;
}

.artwork-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}

.tag {
  font-size: 12px;
  background-color: #f0f0f0;
  color: #666;
  padding: 2px 8px;
  border-radius: 4px;
}

.artwork-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}
</style>