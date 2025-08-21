import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { 
  User, 
  Meal, 
  Symptom, 
  PatternInsight, 
  HealthScore, 
  MicrobiomeData,
  CursorPosition 
} from '@/types'

// Main App Store
interface AppState {
  // User & Auth
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Data
  meals: Meal[]
  symptoms: Symptom[]
  insights: PatternInsight[]
  healthScore: HealthScore | null
  microbiomeData: MicrobiomeData | null
  
  // UI State
  currentView: 'dashboard' | 'logger' | 'insights' | 'profile'
  cursorPosition: CursorPosition
  magneticElements: HTMLElement[]
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  addMeal: (meal: Meal) => void
  addSymptom: (symptom: Symptom) => void
  updateHealthScore: (score: HealthScore) => void
  setCursor: (position: CursorPosition) => void
  setCurrentView: (view: AppState['currentView']) => void
  registerMagneticElement: (element: HTMLElement) => void
  unregisterMagneticElement: (element: HTMLElement) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        meals: [],
        symptoms: [],
        insights: [],
        healthScore: null,
        microbiomeData: null,
        currentView: 'dashboard',
        cursorPosition: { x: 0, y: 0 },
        magneticElements: [],
        
        // Actions
        setUser: (user) => set({ user, isAuthenticated: !!user }, false, 'setUser'),
        
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        
        addMeal: (meal) => set(
          (state) => ({ meals: [...state.meals, meal] }),
          false,
          'addMeal'
        ),
        
        addSymptom: (symptom) => set(
          (state) => ({ symptoms: [...state.symptoms, symptom] }),
          false,
          'addSymptom'
        ),
        
        updateHealthScore: (healthScore) => set(
          { healthScore },
          false,
          'updateHealthScore'
        ),
        
        setCursor: (cursorPosition) => set(
          { cursorPosition },
          false,
          'setCursor'
        ),
        
        setCurrentView: (currentView) => set(
          { currentView },
          false,
          'setCurrentView'
        ),
        
        registerMagneticElement: (element) => set(
          (state) => ({ 
            magneticElements: [...state.magneticElements, element] 
          }),
          false,
          'registerMagneticElement'
        ),
        
        unregisterMagneticElement: (element) => set(
          (state) => ({ 
            magneticElements: state.magneticElements.filter(el => el !== element) 
          }),
          false,
          'unregisterMagneticElement'
        ),
      }),
      {
        name: 'gutwise-storage',
        partialize: (state) => ({
          user: state.user,
          meals: state.meals,
          symptoms: state.symptoms,
          healthScore: state.healthScore,
          microbiomeData: state.microbiomeData,
        }),
      }
    ),
    { name: 'GutWise Store' }
  )
)

// Specialized stores for complex features
interface VisualizationState {
  activeChart: string | null
  animationSpeed: number
  showTooltips: boolean
  colorScheme: 'organic' | 'microbiome' | 'cellular'
  
  setActiveChart: (chart: string | null) => void
  setAnimationSpeed: (speed: number) => void
  toggleTooltips: () => void
  setColorScheme: (scheme: VisualizationState['colorScheme']) => void
}

export const useVisualizationStore = create<VisualizationState>()(
  devtools(
    (set) => ({
      activeChart: null,
      animationSpeed: 1,
      showTooltips: true,
      colorScheme: 'organic',
      
      setActiveChart: (activeChart) => set({ activeChart }),
      setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
      toggleTooltips: () => set((state) => ({ showTooltips: !state.showTooltips })),
      setColorScheme: (colorScheme) => set({ colorScheme }),
    }),
    { name: 'Visualization Store' }
  )
)

// Navigation store for organic navigation patterns
interface NavigationState {
  isMenuOpen: boolean
  activeMenuItem: string | null
  navigationMode: 'circular' | 'spiral' | 'floating'
  
  toggleMenu: () => void
  setActiveMenuItem: (item: string | null) => void
  setNavigationMode: (mode: NavigationState['navigationMode']) => void
}

export const useNavigationStore = create<NavigationState>()(
  devtools(
    (set) => ({
      isMenuOpen: false,
      activeMenuItem: null,
      navigationMode: 'circular',
      
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setActiveMenuItem: (activeMenuItem) => set({ activeMenuItem }),
      setNavigationMode: (navigationMode) => set({ navigationMode }),
    }),
    { name: 'Navigation Store' }
  )
)