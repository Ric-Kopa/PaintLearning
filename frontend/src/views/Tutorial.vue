<template>
  <div class="tutorial-container">
    <div v-if="store.loading || !tutorial" class="loading-container">
      <el-loading-spinner size="large" />
      <p>{{ !tutorial ? '正在生成教程...' : '加载中...' }}</p>
    </div>

    <div v-else>
      <div class="materials-section">
        <h3 class="section-title">
          <el-icon><Package /></el-icon>
          所需材料
        </h3>
        <div class="materials-list">
          <span v-for="material in tutorial.materials" :key="material" class="material-tag">
            {{ material }}
          </span>
        </div>
      </div>

      <div class="tips-section">
        <h3 class="section-title">
          <el-icon><Lightbulb /></el-icon>
          小贴士
        </h3>
        <ul class="tips-list">
          <li v-for="(tip, index) in tutorial.tips" :key="index">{{ tip }}</li>
        </ul>
      </div>

      <div class="steps-section">
        <h3 class="section-title">
          <el-icon><List /></el-icon>
          绘画步骤
        </h3>
        
        <el-timeline>
          <el-timeline-item 
            v-for="step in tutorial.steps" 
            :key="step.order"
            :timestamp="`步骤 ${step.order}`"
          >
            <el-card class="step-card">
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
              <div class="step-key-points">
                <h5>要点：</h5>
                <ul>
                  <li v-for="(point, index) in step.keyPoints" :key="index">{{ point }}</li>
                </ul>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div class="action-container">
        <el-button type="primary" size="large" @click="navigateToPractice">
          <el-icon><EditPen /></el-icon>
          开始练习
        </el-button>
      </div>
    </div>

    <BottomNav active="home" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Package, Lightbulb, List, EditPen } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const tutorial = computed(() => store.currentArtwork?.tutorial)

onMounted(async () => {
  const artworkId = route.params.id as string
  if (artworkId) {
    await store.loadArtworkById(artworkId)
    
    if (!store.currentArtwork?.tutorial) {
      await store.generateTutorial(artworkId)
    }
  }
})

function navigateToPractice() {
  const artworkId = route.params.id as string
  router.push(`/practice/${artworkId}`)
}
</script>

<style lang="scss" scoped>
.tutorial-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  padding-bottom: 80px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  gap: 16px;
  
  p {
    font-size: 16px;
    color: #666;
  }
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

.materials-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.materials-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.material-tag {
  background-color: #e8f4fd;
  color: #409eff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.tips-section {
  background: #fffbe6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #e6a23c;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
  
  li {
    font-size: 14px;
    color: #8b7355;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.steps-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step-card {
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}

.step-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
  line-height: 1.6;
}

.step-key-points {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  
  h5 {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }
  }
}

.action-container {
  padding-top: 8px;
}
</style>