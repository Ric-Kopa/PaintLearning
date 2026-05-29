<template>
  <div class="analysis-container">
    <div v-if="store.loading" class="loading-container">
      <el-loading-spinner size="large" />
      <p>AI正在分析中...</p>
    </div>

    <template v-else>
      <div v-if="!artwork?.analysis" class="upload-section">
        <div v-if="selectedImage" class="image-card">
          <img :src="selectedImage" class="preview-image" />
          <div class="image-actions">
            <el-button @click="selectedImage = ''">重选</el-button>
            <el-button type="primary" @click="analyzeArtwork">开始分析</el-button>
          </div>
        </div>

        <div v-else class="upload-card">
          <h2 class="upload-title">上传画作</h2>
          <p class="upload-subtitle">选择或上传一幅画作进行分析</p>
          <div class="upload-buttons">
            <input 
              type="file" 
              accept="image/*" 
              id="file-input" 
              class="file-input"
              @change="handleFileSelect"
            />
            <label for="file-input" class="upload-label">
              <el-button type="primary" size="large">
                <el-icon><ImageFilled /></el-icon>
                选择图片
              </el-button>
            </label>
          </div>
        </div>
      </div>

      <div v-else class="results-section">
        <el-card class="result-image-card">
          <img :src="artwork.imageUri" class="result-image" />
          <div class="result-info">
            <h3>{{ artwork.analysis.style.genre }}</h3>
            <p>{{ artwork.analysis.overallSummary }}</p>
          </div>
        </el-card>

        <div class="tabs-container">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane label="构图" name="composition" />
            <el-tab-pane label="配色" name="color" />
            <el-tab-pane label="技法" name="technique" />
            <el-tab-pane label="风格" name="style" />
            <el-tab-pane label="光影" name="lightShadow" />
          </el-tabs>
        </div>

        <el-card class="analysis-content">
          <div v-for="(value, key) in currentAnalysis" :key="key" class="analysis-item">
            <h4 class="analysis-label">{{ getLabel(key) }}</h4>
            <p class="analysis-value">{{ Array.isArray(value) ? value.join(', ') : value }}</p>
          </div>
        </el-card>

        <div class="actions-container">
          <el-button 
            type="primary" 
            size="large"
            @click="navigateToTutorial"
          >
            <el-icon><BookOpen /></el-icon>
            {{ artwork.tutorial ? '查看教程' : '生成教程' }}
          </el-button>
        </div>
      </div>
    </template>

    <BottomNav active="home" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ImageFilled, BookOpen } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const selectedImage = ref<string>('')
const activeTab = ref<'composition' | 'color' | 'technique' | 'style' | 'lightShadow'>('composition')

const artwork = computed(() => store.currentArtwork)

const currentAnalysis = computed(() => {
  if (!artwork.value?.analysis) return {}
  
  switch (activeTab.value) {
    case 'composition':
      return artwork.value.analysis.composition
    case 'color':
      return artwork.value.analysis.color
    case 'technique':
      return artwork.value.analysis.technique
    case 'style':
      return artwork.value.analysis.style
    case 'lightShadow':
      return artwork.value.analysis.lightShadow
    default:
      return {}
  }
})

onMounted(async () => {
  const artworkId = route.params.id as string
  if (artworkId) {
    await store.loadArtworkById(artworkId)
  }
})

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

async function analyzeArtwork() {
  if (!selectedImage.value) return

  const imageBase64 = selectedImage.value.split(',')[1]
  const newArtwork = await store.createArtwork(selectedImage.value)
  
  if (newArtwork) {
    await store.analyzeArtwork(newArtwork.id, imageBase64)
  }
}

function navigateToTutorial() {
  if (artwork.value) {
    router.push(`/tutorial/${artwork.value.id}`)
  }
}

function getLabel(key: string): string {
  const labels: Record<string, string> = {
    layoutType: '布局类型',
    focalPoint: '视觉重心',
    spatialHierarchy: '空间层次',
    negativeSpace: '正负空间',
    details: '详细分析',
    primaryColors: '主色调',
    schemeType: '配色方案',
    temperature: '色彩冷暖',
    saturation: '饱和度',
    emotion: '色彩情感',
    medium: '绘画媒介',
    brushStroke: '笔触特征',
    texture: '肌理效果',
    specialTechniques: '特殊技法',
    genre: '艺术流派',
    artistReference: '参考艺术家',
    characteristics: '风格特征',
    lightDirection: '光源方向',
    contrast: '明暗对比',
    volume: '体积感'
  }
  return labels[key] || key
}
</script>

<style lang="scss" scoped>
.analysis-container {
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

.results-section {
  padding: 20px;
}

.result-image-card {
  margin-bottom: 16px;
  overflow: hidden;
}

.result-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.result-info {
  padding: 16px;
  
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 12px;
    color: #333;
  }
  
  p {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.6;
  }
}

.tabs-container {
  margin-bottom: 16px;
}

.analysis-content {
  margin-bottom: 16px;
}

.analysis-item {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.analysis-label {
  font-size: 14px;
  font-weight: 600;
  color: #999;
  margin: 0 0 8px;
}

.analysis-value {
  font-size: 16px;
  color: #333;
  margin: 0;
  line-height: 1.6;
}

.actions-container {
  padding-top: 8px;
}
</style>