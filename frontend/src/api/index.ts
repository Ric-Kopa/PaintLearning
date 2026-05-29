import axios from 'axios'
import type { ApiResponse, Artwork, AnalysisResult, Tutorial, Feedback, AISettings, ArtworkCreateRequest, AnalysisRequest, PracticeRequest, AISettingsUpdateRequest } from '@/types'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const artworkApi = {
  getAll: async (): Promise<ApiResponse<Artwork[]>> => {
    const response = await api.get('/artworks')
    return response.data
  },

  getById: async (id: string): Promise<ApiResponse<Artwork>> => {
    const response = await api.get(`/artworks/${id}`)
    return response.data
  },

  create: async (request: ArtworkCreateRequest): Promise<ApiResponse<Artwork>> => {
    const response = await api.post('/artworks', request)
    return response.data
  },

  update: async (id: string, request: ArtworkCreateRequest): Promise<ApiResponse<Artwork>> => {
    const response = await api.put(`/artworks/${id}`, request)
    return response.data
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/artworks/${id}`)
    return response.data
  },

  toggleFavorite: async (id: string): Promise<ApiResponse<Artwork>> => {
    const response = await api.post(`/artworks/${id}/favorite`)
    return response.data
  },

  analyze: async (id: string, request: AnalysisRequest): Promise<ApiResponse<AnalysisResult>> => {
    const response = await api.post(`/artworks/${id}/analyze`, request)
    return response.data
  },

  generateTutorial: async (id: string): Promise<ApiResponse<Tutorial>> => {
    const response = await api.post(`/artworks/${id}/tutorial`)
    return response.data
  },

  createPractice: async (request: PracticeRequest): Promise<ApiResponse<Feedback>> => {
    const response = await api.post('/artworks/practice', request)
    return response.data
  }
}

export const aiSettingsApi = {
  get: async (): Promise<ApiResponse<AISettings>> => {
    const response = await api.get('/ai-settings')
    return response.data
  },

  update: async (request: AISettingsUpdateRequest): Promise<ApiResponse<AISettings>> => {
    const response = await api.put('/ai-settings', request)
    return response.data
  }
}