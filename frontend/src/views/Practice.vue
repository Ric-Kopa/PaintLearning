<template>
  <div class="practice-container">
    <div v-if="store.loading" class="loading-container">
      <el-loading-spinner size="large" />
      <p>AI正在评估中...</p>
    </div>

    <template v-else>
      <div v-if="!feedback" class="upload-section">
        <div v-if="selectedImage" class="image-card">
          <img :src="selectedImage" class="preview-image" />
          <div class="image-actions">
            <el-button @click="selectedImage = ''">重选</el-button>
            <el-button type="primary" @click="submitPractice">提交练习</el-button>
          </div>
        </div>

        <div v-else class="upload-card">
          <h2 class="upload-title">上传练习作品</h2>
          <p class="upload-subtitle">上传你根据教程完成的练习作品，AI将为你提供反馈</p>
          <div class="upload-buttons">
            <input 
              type="file" 
              accept="image/*" 
              id="practice-input" 
              class="file-input"
              @change="handleFileSelect"
            />
            <label for="practice-input" class="upload-label">
              <el-button type="primary" size="large">
                <el-icon><Upload /></el-icon>
                选择图片
              </el-button>
            </label>
          </div>
        </div>
      </div>

      <div v-else class="feedback-section">
        <div class="rating-section">
          <h3 class="section-title">总体评分</h3>
          <div class="rating-display">
            <el-rate :model-value="feedback.overallRating" disabled :max="5" />
            <span class="rating-value">{{ feedback.overallRating }}/5</span>
          </div>
        </div>

        <div class="strengths-section">
          <h3 class="section-title">
            <el-icon><ThumbsUp /></el-icon>
            优点
          </h3>
          <ul class="strengths-list">
            <li v-for="(strength, index) in feedback.strengths" :key="index">
              {{ strength }}
            </li>
          </ul>
        </div>

        <div class="weaknesses-section">
          <h3 class="section-title">
            <el-icon><AlertCircle /></el-icon>
            改进空间
          </h3>
          <ul class="weaknesses-list">
            <li v-for="(weakness, index) in feedback.weaknesses" :key="index">
              {{ weakness }}
            </li>
          </ul>
        </div>

        <div class="suggestions-section">
          <h3 class="section-title">
            <el-icon><ListChecks /></el-icon>
            改进建议
          </h3>
          <div class="suggestions-list">
            <el-card 
              v-for="(suggestion, index) in feedback.suggestions" 
              :key="index"
              class="suggestion-card"
            >
              <div class="suggestion-header">
                <span class="suggestion-area">{{ suggestion.area }}</span>
                <span :class="['priority-tag', suggestion.priority]">
                  {{ getPriorityLabel(suggestion.priority) }}
                </span>
              </div>
              <p class="suggestion-description">{{ suggestion.description }}</p>
            </el-card>
          </div>
        </div>

        <div class="action-container">
          <el-button type="primary" size="large" @click="resetAndTryAgain">
            <el-icon><RefreshCw /></el-icon>
            再次练习
          </el-button>
        </div>
      </div>
    </template>

    <BottomNav active="home" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Upload, ThumbsUp, AlertCircle, ListChecks, RefreshCw } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import BottomNav from '@/components/BottomNav.vue'
import type { Feedback } from '@/types'

const route = useRoute()
const store = useAppStore()

const selectedImage = ref<string>('')
const feedback = ref<Feedback | null>(null)

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

async function submitPractice() {
  if (!selectedImage.value) return

  const artworkId = route.params.id as string
  const imageBase64 = selectedImage.value.split(',')[1]
  
  const result = await store.createPractice(artworkId, imageBase64)
  if (result) {
    feedback.value = result
  }
}

function resetAndTryAgain() {
  selectedImage.value = ''
  feedback.value = null
}

function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  return labels[priority] || priority
}
</script>

<style lang="scss" scoped>
.practice-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 16px;
  
  p {
    font-size: 16px;
    color: #666;
  }
}

.upload-section {
  padding: 20px;
}

.upload-card {
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.upload-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 8px;
  color: #333;
}

.upload-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0 0 24px;
}

.upload-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-input {
  display: none;
}

.upload-label {
  cursor: pointer;
}

.image-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 16px;
}

.preview-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.image-actions {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.feedback-section {
  padding: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.rating-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  
  .rating-value {
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
  }
}

.strengths-section {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #409eff;
}

.strengths-list {
  margin: 0;
  padding-left: 20px;
  
  li {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.weaknesses-section {
  background: #fff7ed;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #e6a23c;
}

.weaknesses-list {
  margin: 0;
  padding-left: 20px;
  
  li {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.suggestions-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-card {
  padding: 16px;
}

.suggestion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.suggestion-area {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.priority-tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  
  &.high {
    background-color: #fef0f0;
    color: #dc3545;
  }
  
  &.medium {
    background-color: #fff7ed;
    color: #e6a23c;
  }
  
  &.low {
    background-color: #f0fdf4;
    color: #22c55e;
  }
}

.suggestion-description {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.action-container {
  padding-top: 8px;
}
</style>