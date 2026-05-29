<template>
  <div class="settings-container">
    <header class="header">
      <h1 class="title">设置</h1>
    </header>

    <div class="settings-list">
      <el-card class="settings-card">
        <h3 class="card-title">AI 模型设置</h3>
        
        <div class="form-item">
          <label class="form-label">语言</label>
          <el-select 
            v-model="language" 
            placeholder="选择语言"
            class="form-select"
          >
            <el-option label="中文" value="zh" />
            <el-option label="English" value="en" />
            <el-option label="日本語" value="ja" />
            <el-option label="한국어" value="ko" />
          </el-select>
        </div>

        <div class="form-item">
          <label class="form-label">API Key (OpenAI)</label>
          <el-input 
            v-model="openaiKey" 
            type="password"
            placeholder="请输入 OpenAI API Key"
            class="form-input"
          />
        </div>

        <div class="form-item">
          <label class="form-label">API Key (Claude)</label>
          <el-input 
            v-model="claudeKey" 
            type="password"
            placeholder="请输入 Claude API Key"
            class="form-input"
          />
        </div>

        <div class="form-item">
          <label class="form-label">API Key (Gemini)</label>
          <el-input 
            v-model="geminiKey" 
            type="password"
            placeholder="请输入 Gemini API Key"
            class="form-input"
          />
        </div>

        <div class="form-item">
          <label class="form-label">当前模型</label>
          <el-radio-group v-model="model" class="radio-group">
            <el-radio label="openai">OpenAI</el-radio>
            <el-radio label="claude">Claude</el-radio>
            <el-radio label="gemini">Gemini</el-radio>
          </el-radio-group>
        </div>
      </el-card>

      <el-card class="settings-card">
        <h3 class="card-title">关于</h3>
        <div class="about-info">
          <p class="about-item">
            <span class="about-label">版本</span>
            <span class="about-value">1.0.0</span>
          </p>
          <p class="about-item">
            <span class="about-label">描述</span>
            <span class="about-value">AI绘画教学助手 - 学习绘画，从分析名作开始</span>
          </p>
        </div>
      </el-card>
    </div>

    <div class="action-container">
      <el-button type="primary" size="large" @click="saveSettings">
        <el-icon><Save /></el-icon>
        保存设置
      </el-button>
    </div>

    <BottomNav active="settings" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Save } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import BottomNav from '@/components/BottomNav.vue'

const store = useAppStore()

const language = ref('zh')
const model = ref('openai')
const openaiKey = ref('')
const claudeKey = ref('')
const geminiKey = ref('')

onMounted(() => {
  store.loadAISettings()
  language.value = store.aiSettings.language
  model.value = store.aiSettings.model
})

async function saveSettings() {
  const request = {
    language: language.value,
    model: model.value,
    openaiKey: openaiKey.value || undefined,
    claudeKey: claudeKey.value || undefined,
    geminiKey: geminiKey.value || undefined
  }
  
  const success = await store.updateAISettings(request)
  if (success) {
    alert('设置保存成功')
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 140px;
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

.settings-list {
  padding: 0 20px;
}

.settings-card {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.form-item {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
}

.form-select, .form-input {
  width: 100%;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.about-info {
  padding-top: 8px;
}

.about-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
}

.about-label {
  font-size: 14px;
  color: #999;
}

.about-value {
  font-size: 14px;
  color: #333;
}

.action-container {
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
</style>