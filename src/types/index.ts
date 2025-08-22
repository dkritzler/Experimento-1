// Core Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences?: UserPreferences
  subscription?: SubscriptionTier
  profile?: UserProfile
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  age?: number
  gender?: 'male' | 'female' | 'other'
  height?: number // in cm
  weight?: number // in kg
  dietaryRestrictions: string[]
  allergies: string[]
  healthGoals: string[]
  microbiomeScore?: number
  lastAnalysis?: Date
}

export interface UserPreferences {
  notifications: boolean
  darkMode: boolean
  language: string
  timezone: string
}

export type SubscriptionTier = 'free' | 'premium' | 'pro'

// Food & Nutrition Types
export interface Food {
  id: string
  name: string
  category: FoodCategory
  allergens: Allergen[]
  nutritionalInfo: NutritionalInfo
  commonTriggers: string[]
}

export type FoodCategory = 
  | 'grains' 
  | 'dairy' 
  | 'fruits' 
  | 'vegetables' 
  | 'proteins' 
  | 'legumes' 
  | 'nuts' 
  | 'beverages' 
  | 'processed'

export type Allergen = 
  | 'gluten' 
  | 'dairy' 
  | 'nuts' 
  | 'soy' 
  | 'eggs' 
  | 'shellfish' 
  | 'fish'

export interface NutritionalInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
}

// Meal & Symptom Tracking
export interface Meal {
  id: string
  userId: string
  timestamp: Date
  foods: MealFood[]
  portion: PortionSize
  notes?: string
  mood: MoodRating
  location?: string
}

export interface MealFood {
  food: Food
  quantity: number
  unit: string
}

export type PortionSize = 'small' | 'medium' | 'large' | 'extra-large'
export type MoodRating = 1 | 2 | 3 | 4 | 5

export interface Symptom {
  id: string
  userId: string
  timestamp: Date
  type: SymptomType
  severity: SeverityLevel
  duration: number // minutes
  notes?: string
  triggers?: string[]
}

export type SymptomType = 
  | 'bloating' 
  | 'gas' 
  | 'stomach_pain' 
  | 'nausea' 
  | 'diarrhea' 
  | 'constipation' 
  | 'heartburn' 
  | 'fatigue' 
  | 'headache' 
  | 'skin_issues'

export type SeverityLevel = 1 | 2 | 3 | 4 | 5

// AI & Pattern Detection
export interface PatternInsight {
  id: string
  userId: string
  type: InsightType
  confidence: number
  trigger: Food
  symptoms: SymptomType[]
  timeframe: string
  recommendation: string
  created: Date
}

export type InsightType = 
  | 'food_sensitivity' 
  | 'timing_pattern' 
  | 'combination_trigger' 
  | 'improvement_trend'

export interface HealthScore {
  overall: number
  digestive: number
  inflammation: number
  microbiome: number
  trends: ScoreTrend[]
  lastUpdated: Date
}

export interface ScoreTrend {
  metric: string
  change: number
  period: string
}

// Microbiome Data
export interface MicrobiomeData {
  id: string
  userId: string
  testDate: Date
  diversity: number
  bacteria: BacteriaProfile[]
  recommendations: MicrobiomeRecommendation[]
}

export interface BacteriaProfile {
  name: string
  percentage: number
  type: 'beneficial' | 'neutral' | 'harmful'
  trend: 'increasing' | 'stable' | 'decreasing'
}

export interface MicrobiomeRecommendation {
  type: 'probiotic' | 'prebiotic' | 'dietary' | 'lifestyle'
  description: string
  priority: 'low' | 'medium' | 'high'
}

// Additional Types for Backend Integration
export interface Pattern {
  id: string
  userId: string
  type: PatternType
  trigger: string
  response: string
  confidence: number
  occurrences: number
  firstSeen: Date
  lastSeen: Date
}

export type PatternType = 'correlation' | 'timing' | 'positive' | 'cycle'

export interface Recipe {
  id: string
  title: string
  description: string
  imageUrl?: string
  cookTime: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  benefits: string[]
  ingredients: string[]
  instructions: string[]
  gutHealthScore: number
  tags: string[]
}

export interface Product {
  id: string
  name: string
  brand?: string
  type: ProductType
  description: string
  benefits: string[]
  dosage?: string
  price: number
  rating: number
  reviewCount?: number
  link?: string
}

export type ProductType = 'probiotic' | 'prebiotic' | 'supplement' | 'food'

export interface OnboardingData {
  personalInfo: {
    name: string
    age: number
    gender: 'male' | 'female' | 'other'
    height: number
    weight: number
  }
  healthInfo: {
    conditions: string[]
    medications: string[]
    supplements: string[]
  }
  dietInfo: {
    restrictions: string[]
    allergies: string[]
    preferences: string[]
  }
  goals: string[]
}

// UI & Visualization
export interface ChartDataPoint {
  x: number | string | Date
  y: number
  label?: string
  color?: string
}

export interface NetworkNode {
  id: string
  label: string
  type: 'food' | 'symptom'
  size: number
  color: string
  x?: number
  y?: number
}

export interface NetworkLink {
  source: string
  target: string
  strength: number
  type: 'positive' | 'negative' | 'neutral'
}

// Animation & Interaction
export interface AnimationConfig {
  duration: number
  delay?: number
  easing: string
  repeat?: boolean
}

export interface CursorPosition {
  x: number
  y: number
}

export interface MagneticElement {
  id: string
  element: HTMLElement
  strength: number
  radius: number
}