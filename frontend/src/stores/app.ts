import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Artwork, AISettings, AnalysisResult, Tutorial, Feedback } from '@/types'
import { artworkApi, aiSettingsApi } from '@/api'

export const useAppStore = defineStore('app', () => {
  const artworks = ref<Artwork[]>([])
  const currentArtwork = ref<Artwork | null>(null)
  const aiSettings = ref<AISettings>({
    id: '',
    model: 'openai',
    language: 'zh'
  })
  const loading = ref(false)

  const recentArtworks = computed(() => {
    return artworks.value.slice(0, 4)
  })

  const favoriteArtworks = computed(() => {
    return artworks.value.filter(a => a.isFavorite)
  })

  async function loadArtworks() {
    loading.value = true
    try {
      const response = await artworkApi.getAll()
      if (response.code === 0) {
        artworks.value = response.data.map((a: Artwork) => ({
          ...a,
          createdAt: new Date(a.createdAt)
        }))
      }
    } catch (error) {
      console.error('Failed to load artworks:', error)
    } finally {
      loading.value = false
    }
  }

  async function loadArtworkById(id: string) {
    loading.value = true
    try {
      const response = await artworkApi.getById(id)
      if (response.code === 0) {
        currentArtwork.value = {
          ...response.data,
          createdAt: new Date(response.data.createdAt)
        }
        return currentArtwork.value
      }
    } catch (error) {
      console.error('Failed to load artwork:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function createArtwork(imageUri: string, thumbnailUri?: string, tags?: string[]) {
    loading.value = true
    try {
      const request = { imageUri, thumbnailUri, tags }
      const response = await artworkApi.create(request)
      if (response.code === 0) {
        const newArtwork = {
          ...response.data,
          createdAt: new Date(response.data.createdAt)
        }
        artworks.value.unshift(newArtwork)
        currentArtwork.value = newArtwork
        return newArtwork
      }
    } catch (error) {
      console.error('Failed to create artwork:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function updateArtwork(id: string, updates: Partial<Artwork>) {
    loading.value = true
    try {
      const request = { imageUri: updates.imageUri, thumbnailUri: updates.thumbnailUri, tags: updates.tags }
      const response = await artworkApi.update(id, request)
      if (response.code === 0) {
        const index = artworks.value.findIndex(a => a.id === id)
        if (index !== -1) {
          artworks.value[index] = {
            ...artworks.value[index],
            ...response.data,
            createdAt: new Date(response.data.createdAt)
          }
        }
        if (currentArtwork.value?.id === id) {
          currentArtwork.value = {
            ...currentArtwork.value,
            ...response.data,
            createdAt: new Date(response.data.createdAt)
          }
        }
        return response.data
      }
    } catch (error) {
      console.error('Failed to update artwork:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function deleteArtwork(id: string) {
    loading.value = true
    try {
      const response = await artworkApi.delete(id)
      if (response.code === 0) {
        artworks.value = artworks.value.filter(a => a.id !== id)
        if (currentArtwork.value?.id === id) {
          currentArtwork.value = null
        }
        return true
      }
    } catch (error) {
      console.error('Failed to delete artwork:', error)
    } finally {
      loading.value = false
    }
    return false
  }

  async function toggleFavorite(id: string) {
    loading.value = true
    try {
      const response = await artworkApi.toggleFavorite(id)
      if (response.code === 0) {
        const index = artworks.value.findIndex(a => a.id === id)
        if (index !== -1) {
          artworks.value[index].isFavorite = !artworks.value[index].isFavorite
        }
        if (currentArtwork.value?.id === id) {
          currentArtwork.value.isFavorite = !currentArtwork.value.isFavorite
        }
        return response.data
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function analyzeArtwork(artworkId: string, imageBase64: string): Promise<AnalysisResult | null> {
    loading.value = true
    try {
      const request = { imageBase64, language: aiSettings.value.language }
      const response = await artworkApi.analyze(artworkId, request)
      if (response.code === 0) {
        const index = artworks.value.findIndex(a => a.id === artworkId)
        if (index !== -1) {
          artworks.value[index].analysis = response.data
        }
        if (currentArtwork.value?.id === artworkId) {
          currentArtwork.value.analysis = response.data
        }
        return response.data
      }
    } catch (error) {
      console.error('Failed to analyze artwork:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function generateTutorial(artworkId: string): Promise<Tutorial | null> {
    loading.value = true
    try {
      const response = await artworkApi.generateTutorial(artworkId)
      if (response.code === 0) {
        const index = artworks.value.findIndex(a => a.id === artworkId)
        if (index !== -1) {
          artworks.value[index].tutorial = response.data
        }
        if (currentArtwork.value?.id === artworkId) {
          currentArtwork.value.tutorial = response.data
        }
        return response.data
      }
    } catch (error) {
      console.error('Failed to generate tutorial:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function createPractice(artworkId: string, practiceImageBase64: string): Promise<Feedback | null> {
    loading.value = true
    try {
      const request = { artworkId, practiceImageBase64, language: aiSettings.value.language }
      const response = await artworkApi.createPractice(request)
      if (response.code === 0) {
        return response.data
      }
    } catch (error) {
      console.error('Failed to create practice:', error)
    } finally {
      loading.value = false
    }
    return null
  }

  async function loadAISettings() {
    try {
      const response = await aiSettingsApi.get()
      if (response.code === 0) {
        aiSettings.value = response.data
      }
    } catch (error) {
      console.error('Failed to load AI settings:', error)
    }
  }

  async function updateAISettings(settings: Partial<AISettingsUpdateRequest>) {
    loading.value = true
    try {
      const response = await aiSettingsApi.update(settings)
      if (response.code === 0) {
        aiSettings.value = response.data
        return true
      }
    } catch (error) {
      console.error('Failed to update AI settings:', error)
    } finally {
      loading.value = false
    }
    return false
  }

  function setCurrentArtwork(artwork: Artwork | null) {
    currentArtwork.value = artwork
  }

  return {
    artworks,
    currentArtwork,
    aiSettings,
    loading,
    recentArtworks,
    favoriteArtworks,
    loadArtworks,
    loadArtworkById,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    toggleFavorite,
    analyzeArtwork,
    generateTutorial,
    createPractice,
    loadAISettings,
    updateAISettings,
    setCurrentArtwork
  }
})