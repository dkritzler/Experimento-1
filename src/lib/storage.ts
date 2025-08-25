import type { Meal, Symptom, Pattern, Recipe, Product } from '@/types'

// Storage keys
const STORAGE_KEYS = {
  USER: 'gutwise_user',
  AUTH_TOKEN: 'auth_token',
  MEALS: 'gutwise_meals',
  SYMPTOMS: 'gutwise_symptoms',
  PATTERNS: 'gutwise_patterns',
  RECIPES: 'gutwise_saved_recipes',
  PRODUCTS: 'gutwise_saved_products',
  PREFERENCES: 'gutwise_preferences',
  ONBOARDING: 'gutwise_onboarding',
  SYNC_QUEUE: 'gutwise_sync_queue',
} as const

// Local storage wrapper with error handling
class LocalStorage {
  static setItem(key: string, value: any): boolean {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.error('LocalStorage setItem error:', error)
      return false
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null
      return JSON.parse(item) as T
    } catch (error) {
      console.error('LocalStorage getItem error:', error)
      return null
    }
  }

  static removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('LocalStorage removeItem error:', error)
      return false
    }
  }

  static clear(): boolean {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
      return true
    } catch (error) {
      console.error('LocalStorage clear error:', error)
      return false
    }
  }
}

// Offline sync queue for API calls
interface SyncQueueItem {
  id: string
  type: 'meal' | 'symptom' | 'pattern'
  action: 'create' | 'update' | 'delete'
  data: any
  timestamp: Date
  retries: number
}

export class OfflineSync {
  private static QUEUE_KEY = STORAGE_KEYS.SYNC_QUEUE
  private static MAX_RETRIES = 3

  static addToQueue(item: Omit<SyncQueueItem, 'id' | 'timestamp' | 'retries'>): void {
    const queue = this.getQueue()
    const newItem: SyncQueueItem = {
      ...item,
      id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      retries: 0,
    }
    queue.push(newItem)
    LocalStorage.setItem(this.QUEUE_KEY, queue)
  }

  static getQueue(): SyncQueueItem[] {
    return LocalStorage.getItem<SyncQueueItem[]>(this.QUEUE_KEY) || []
  }

  static removeFromQueue(id: string): void {
    const queue = this.getQueue().filter(item => item.id !== id)
    LocalStorage.setItem(this.QUEUE_KEY, queue)
  }

  static async processQueue(apiCall: (item: SyncQueueItem) => Promise<boolean>): Promise<void> {
    const queue = this.getQueue()
    
    for (const item of queue) {
      try {
        const success = await apiCall(item)
        
        if (success) {
          this.removeFromQueue(item.id)
        } else {
          // Increment retry count
          item.retries++
          
          if (item.retries >= this.MAX_RETRIES) {
            console.error('Max retries reached for item:', item)
            this.removeFromQueue(item.id)
          } else {
            // Update the queue with incremented retry count
            const updatedQueue = this.getQueue().map(queueItem =>
              queueItem.id === item.id ? { ...queueItem, retries: item.retries } : queueItem
            )
            LocalStorage.setItem(this.QUEUE_KEY, updatedQueue)
          }
        }
      } catch (error) {
        console.error('Error processing sync queue item:', error)
      }
    }
  }

  static clearQueue(): void {
    LocalStorage.setItem(this.QUEUE_KEY, [])
  }
}

// Data storage functions
export const dataStorage = {
  // Meals
  saveMeal(meal: Meal): boolean {
    const meals = this.getMeals()
    meals.push(meal)
    return LocalStorage.setItem(STORAGE_KEYS.MEALS, meals)
  },

  getMeals(): Meal[] {
    return LocalStorage.getItem<Meal[]>(STORAGE_KEYS.MEALS) || []
  },

  updateMeal(id: string, updates: Partial<Meal>): boolean {
    const meals = this.getMeals()
    const index = meals.findIndex(m => m.id === id)
    if (index === -1) return false
    
    meals[index] = { ...meals[index], ...updates }
    return LocalStorage.setItem(STORAGE_KEYS.MEALS, meals)
  },

  deleteMeal(id: string): boolean {
    const meals = this.getMeals().filter(m => m.id !== id)
    return LocalStorage.setItem(STORAGE_KEYS.MEALS, meals)
  },

  // Symptoms
  saveSymptom(symptom: Symptom): boolean {
    const symptoms = this.getSymptoms()
    symptoms.push(symptom)
    return LocalStorage.setItem(STORAGE_KEYS.SYMPTOMS, symptoms)
  },

  getSymptoms(): Symptom[] {
    return LocalStorage.getItem<Symptom[]>(STORAGE_KEYS.SYMPTOMS) || []
  },

  updateSymptom(id: string, updates: Partial<Symptom>): boolean {
    const symptoms = this.getSymptoms()
    const index = symptoms.findIndex(s => s.id === id)
    if (index === -1) return false
    
    symptoms[index] = { ...symptoms[index], ...updates }
    return LocalStorage.setItem(STORAGE_KEYS.SYMPTOMS, symptoms)
  },

  deleteSymptom(id: string): boolean {
    const symptoms = this.getSymptoms().filter(s => s.id !== id)
    return LocalStorage.setItem(STORAGE_KEYS.SYMPTOMS, symptoms)
  },

  // Patterns
  savePatterns(patterns: Pattern[]): boolean {
    return LocalStorage.setItem(STORAGE_KEYS.PATTERNS, patterns)
  },

  getPatterns(): Pattern[] {
    return LocalStorage.getItem<Pattern[]>(STORAGE_KEYS.PATTERNS) || []
  },

  // Saved Recipes
  saveRecipe(recipe: Recipe): boolean {
    const recipes = this.getSavedRecipes()
    if (!recipes.find(r => r.id === recipe.id)) {
      recipes.push(recipe)
      return LocalStorage.setItem(STORAGE_KEYS.RECIPES, recipes)
    }
    return true
  },

  unsaveRecipe(id: string): boolean {
    const recipes = this.getSavedRecipes().filter(r => r.id !== id)
    return LocalStorage.setItem(STORAGE_KEYS.RECIPES, recipes)
  },

  getSavedRecipes(): Recipe[] {
    return LocalStorage.getItem<Recipe[]>(STORAGE_KEYS.RECIPES) || []
  },

  // Saved Products
  saveProduct(product: Product): boolean {
    const products = this.getSavedProducts()
    if (!products.find(p => p.id === product.id)) {
      products.push(product)
      return LocalStorage.setItem(STORAGE_KEYS.PRODUCTS, products)
    }
    return true
  },

  unsaveProduct(id: string): boolean {
    const products = this.getSavedProducts().filter(p => p.id !== id)
    return LocalStorage.setItem(STORAGE_KEYS.PRODUCTS, products)
  },

  getSavedProducts(): Product[] {
    return LocalStorage.getItem<Product[]>(STORAGE_KEYS.PRODUCTS) || []
  },

  // Clear all data
  clearAllData(): boolean {
    return LocalStorage.clear()
  }
}

// Cache management for API responses
export class CacheManager {
  private static CACHE_PREFIX = 'gutwise_cache_'
  private static DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  static set(key: string, data: any, ttl?: number): void {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.DEFAULT_TTL,
    }
    LocalStorage.setItem(`${this.CACHE_PREFIX}${key}`, cacheItem)
  }

  static get<T>(key: string): T | null {
    const cacheItem = LocalStorage.getItem<{
      data: T
      timestamp: number
      ttl: number
    }>(`${this.CACHE_PREFIX}${key}`)

    if (!cacheItem) return null

    const isExpired = Date.now() - cacheItem.timestamp > cacheItem.ttl
    if (isExpired) {
      this.remove(key)
      return null
    }

    return cacheItem.data
  }

  static remove(key: string): void {
    LocalStorage.removeItem(`${this.CACHE_PREFIX}${key}`)
  }

  static clear(): void {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  }
}

// Network status detection
export class NetworkStatus {
  private static listeners: ((online: boolean) => void)[] = []

  static isOnline(): boolean {
    return navigator.onLine
  }

  static subscribe(callback: (online: boolean) => void): () => void {
    this.listeners.push(callback)
    
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }

  static async waitForConnection(timeout = 30000): Promise<boolean> {
    if (this.isOnline()) return true
    
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(false)
      }, timeout)
      
      const unsubscribe = this.subscribe((online) => {
        if (online) {
          clearTimeout(timeoutId)
          unsubscribe()
          resolve(true)
        }
      })
    })
  }
}