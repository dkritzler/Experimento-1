import { z } from 'zod'

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Onboarding validation
export const onboardingSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(2, 'Name is required'),
    age: z.number().min(1).max(120, 'Please enter a valid age'),
    gender: z.enum(['male', 'female', 'other']),
    height: z.number().min(50).max(300, 'Please enter height in cm'),
    weight: z.number().min(20).max(500, 'Please enter weight in kg'),
  }),
  healthInfo: z.object({
    conditions: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    supplements: z.array(z.string()).optional(),
  }),
  dietInfo: z.object({
    restrictions: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    preferences: z.array(z.string()).optional(),
  }),
  goals: z.array(z.string()).min(1, 'Please select at least one goal'),
})

// Meal logging validation
export const mealSchema = z.object({
  foods: z.array(z.object({
    name: z.string(),
    quantity: z.number().positive(),
    unit: z.string(),
  })).min(1, 'Please add at least one food item'),
  portion: z.enum(['small', 'medium', 'large', 'extra-large']),
  mood: z.number().min(1).max(5),
  notes: z.string().optional(),
})

// Symptom logging validation
export const symptomSchema = z.object({
  type: z.enum([
    'bloating',
    'gas',
    'stomach_pain',
    'nausea',
    'diarrhea',
    'constipation',
    'heartburn',
    'fatigue',
    'headache',
    'skin_issues'
  ]),
  severity: z.number().min(1).max(5),
  duration: z.number().min(1).optional(),
  notes: z.string().optional(),
  triggers: z.array(z.string()).optional(),
})

// Validation helper functions
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Form error handling
export function getFormError(error: unknown): string {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message || 'Validation error'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

// Date validation helpers
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}

export function isFutureDate(date: Date): boolean {
  return isValidDate(date) && date > new Date()
}

export function isPastDate(date: Date): boolean {
  return isValidDate(date) && date < new Date()
}

// Sanitization helpers
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
}

export function sanitizeNumber(input: string | number): number | null {
  const num = typeof input === 'string' ? parseFloat(input) : input
  return isNaN(num) ? null : num
}

// Custom validation hooks
export function useFormValidation<T>(
  schema: z.ZodSchema<T>
): {
  validate: (data: unknown) => { success: boolean; data?: T; errors?: z.ZodError }
  validateField: (field: keyof T, value: unknown) => string | null
} {
  const validate = (data: unknown) => {
    try {
      const validatedData = schema.parse(data)
      return { success: true, data: validatedData }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error }
      }
      throw error
    }
  }

  const validateField = (field: keyof T, value: unknown): string | null => {
    try {
      const partialSchema = schema.pick({ [field]: true } as any)
      partialSchema.parse({ [field]: value })
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || null
      }
      return null
    }
  }

  return { validate, validateField }
}