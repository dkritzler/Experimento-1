import type { 
  User, 
  Meal, 
  Symptom, 
  Pattern, 
  MicrobiomeData, 
  Recipe, 
  Product,
  ApiResponse,
  PaginatedResponse,
  OnboardingData
} from '@/types'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const API_TIMEOUT = 30000 // 30 seconds

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    // Get session token from NextAuth
    let token = null
    if (typeof window !== 'undefined') {
      // Client side - get from session storage or cookies
      token = document.cookie
        .split('; ')
        .find(row => row.startsWith('next-auth.session-token='))
        ?.split('=')[1]
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message
    }
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timeout'
        }
      }
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: 'An unknown error occurred'
    }
  }
}

// Authentication Services
export const authService = {
  async register(email: string, password: string, name: string): Promise<ApiResponse<{ user: User }>> {
    return apiCall<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiCall<User>('/auth/me')
  },

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    return apiCall<User>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },

  async completeOnboarding(data: OnboardingData): Promise<ApiResponse<User>> {
    return apiCall<User>('/auth/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// Meal Tracking Services
export const mealService = {
  async createMeal(meal: Omit<Meal, 'id'>): Promise<ApiResponse<Meal>> {
    return apiCall<Meal>('/meals', {
      method: 'POST',
      body: JSON.stringify(meal),
    })
  },

  async getMeals(filters?: {
    startDate?: Date
    endDate?: Date
    page?: number
    limit?: number
  }): Promise<ApiResponse<PaginatedResponse<Meal>>> {
    const params = new URLSearchParams()
    if (filters?.startDate) params.append('startDate', filters.startDate.toISOString())
    if (filters?.endDate) params.append('endDate', filters.endDate.toISOString())
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())
    
    return apiCall<PaginatedResponse<Meal>>(`/meals?${params.toString()}`)
  },

  async updateMeal(id: string, updates: Partial<Meal>): Promise<ApiResponse<Meal>> {
    return apiCall<Meal>(`/meals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },

  async deleteMeal(id: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/meals/${id}`, {
      method: 'DELETE',
    })
  }
}

// Symptom Tracking Services
export const symptomService = {
  async createSymptom(symptom: Omit<Symptom, 'id'>): Promise<ApiResponse<Symptom>> {
    return apiCall<Symptom>('/symptoms', {
      method: 'POST',
      body: JSON.stringify(symptom),
    })
  },

  async getSymptoms(filters?: {
    startDate?: Date
    endDate?: Date
    type?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<PaginatedResponse<Symptom>>> {
    const params = new URLSearchParams()
    if (filters?.startDate) params.append('startDate', filters.startDate.toISOString())
    if (filters?.endDate) params.append('endDate', filters.endDate.toISOString())
    if (filters?.type) params.append('type', filters.type)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())
    
    return apiCall<PaginatedResponse<Symptom>>(`/symptoms?${params.toString()}`)
  },

  async updateSymptom(id: string, updates: Partial<Symptom>): Promise<ApiResponse<Symptom>> {
    return apiCall<Symptom>(`/symptoms/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },

  async deleteSymptom(id: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/symptoms/${id}`, {
      method: 'DELETE',
    })
  }
}

// Pattern Analysis Services
export const patternService = {
  async getPatterns(): Promise<ApiResponse<Pattern[]>> {
    return apiCall<Pattern[]>('/patterns')
  },

  async analyzePatterns(dateRange?: { start: Date; end: Date }): Promise<ApiResponse<Pattern[]>> {
    const params = dateRange 
      ? `?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}`
      : ''
    
    return apiCall<Pattern[]>(`/patterns/analyze${params}`, {
      method: 'POST',
    })
  },

  async getInsights(): Promise<ApiResponse<{
    patterns: Pattern[]
    recommendations: string[]
    healthScore: number
  }>> {
    return apiCall('/insights')
  }
}

// Microbiome Services
export const microbiomeService = {
  async getMicrobiomeData(): Promise<ApiResponse<MicrobiomeData>> {
    return apiCall<MicrobiomeData>('/microbiome')
  },

  async uploadMicrobiomeTest(data: FormData): Promise<ApiResponse<MicrobiomeData>> {
    const token = localStorage.getItem('auth_token')
    
    const response = await fetch(`${API_BASE_URL}/microbiome/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data,
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Upload failed'
      }
    }
    
    return {
      success: true,
      data: result.data
    }
  },

  async getMicrobiomeHistory(): Promise<ApiResponse<MicrobiomeData[]>> {
    return apiCall<MicrobiomeData[]>('/microbiome/history')
  }
}

// Recipe Services
export const recipeService = {
  async getRecommendedRecipes(): Promise<ApiResponse<Recipe[]>> {
    return apiCall<Recipe[]>('/recipes/recommended')
  },

  async searchRecipes(query: string, filters?: {
    tags?: string[]
    difficulty?: string
    maxCookTime?: number
  }): Promise<ApiResponse<Recipe[]>> {
    const params = new URLSearchParams({ q: query })
    if (filters?.tags) params.append('tags', filters.tags.join(','))
    if (filters?.difficulty) params.append('difficulty', filters.difficulty)
    if (filters?.maxCookTime) params.append('maxCookTime', filters.maxCookTime.toString())
    
    return apiCall<Recipe[]>(`/recipes/search?${params.toString()}`)
  },

  async getRecipe(id: string): Promise<ApiResponse<Recipe>> {
    return apiCall<Recipe>(`/recipes/${id}`)
  },

  async saveRecipe(id: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/recipes/${id}/save`, {
      method: 'POST',
    })
  },

  async unsaveRecipe(id: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/recipes/${id}/unsave`, {
      method: 'DELETE',
    })
  },

  async getSavedRecipes(): Promise<ApiResponse<Recipe[]>> {
    return apiCall<Recipe[]>('/recipes/saved')
  }
}

// Product Services
export const productService = {
  async getRecommendedProducts(): Promise<ApiResponse<Product[]>> {
    return apiCall<Product[]>('/products/recommended')
  },

  async searchProducts(query: string, filters?: {
    type?: string
    minRating?: number
    maxPrice?: number
  }): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams({ q: query })
    if (filters?.type) params.append('type', filters.type)
    if (filters?.minRating) params.append('minRating', filters.minRating.toString())
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    
    return apiCall<Product[]>(`/products/search?${params.toString()}`)
  },

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return apiCall<Product>(`/products/${id}`)
  },

  async saveProduct(id: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/products/${id}/save`, {
      method: 'POST',
    })
  },

  async unsaveProduct(id: string): Promise<ApiResponse<void>> {
    return apiCall<void>(`/products/${id}/unsave`, {
      method: 'DELETE',
    })
  },

  async getSavedProducts(): Promise<ApiResponse<Product[]>> {
    return apiCall<Product[]>('/products/saved')
  }
}

// Export all services
export const api = {
  auth: authService,
  meals: mealService,
  symptoms: symptomService,
  patterns: patternService,
  microbiome: microbiomeService,
  recipes: recipeService,
  products: productService,
}