import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample foods
  const foods = await Promise.all([
    prisma.food.create({
      data: {
        name: 'Apple',
        category: 'FRUITS',
        allergens: [],
        commonTriggers: [],
        nutritionalInfo: {
          create: {
            calories: 95,
            protein: 0.5,
            carbs: 25,
            fat: 0.3,
            fiber: 4,
            sugar: 19,
          }
        }
      }
    }),
    prisma.food.create({
      data: {
        name: 'Milk',
        category: 'DAIRY',
        allergens: ['DAIRY'],
        commonTriggers: ['lactose intolerance'],
        nutritionalInfo: {
          create: {
            calories: 150,
            protein: 8,
            carbs: 12,
            fat: 8,
            fiber: 0,
            sugar: 12,
          }
        }
      }
    }),
    prisma.food.create({
      data: {
        name: 'Bread',
        category: 'GRAINS',
        allergens: ['GLUTEN'],
        commonTriggers: ['gluten sensitivity'],
        nutritionalInfo: {
          create: {
            calories: 80,
            protein: 3,
            carbs: 15,
            fat: 1,
            fiber: 2,
            sugar: 1,
          }
        }
      }
    }),
    prisma.food.create({
      data: {
        name: 'Broccoli',
        category: 'VEGETABLES',
        allergens: [],
        commonTriggers: [],
        nutritionalInfo: {
          create: {
            calories: 25,
            protein: 3,
            carbs: 5,
            fat: 0.3,
            fiber: 2.5,
            sugar: 1.5,
          }
        }
      }
    })
  ])

  // Create sample recipes
  const recipes = await Promise.all([
    prisma.recipe.create({
      data: {
        title: 'Fermented Kimchi Bowl',
        description: 'Probiotic-rich Korean fermented vegetables with quinoa and avocado',
        cookTime: 15,
        servings: 2,
        difficulty: 'EASY',
        benefits: ['Improves gut microbiome', 'Reduces inflammation', 'Boosts immunity'],
        ingredients: ['Kimchi', 'Quinoa', 'Avocado', 'Sesame oil', 'Scallions'],
        instructions: [
          'Cook quinoa according to package directions',
          'Slice avocado and prepare scallions',
          'Combine quinoa with kimchi',
          'Top with avocado and drizzle with sesame oil'
        ],
        gutHealthScore: 95,
        tags: ['Fermented', 'Anti-inflammatory', 'Quick'],
      }
    }),
    prisma.recipe.create({
      data: {
        title: 'Bone Broth Healing Soup',
        description: 'Collagen-rich bone broth with gut-healing herbs and vegetables',
        cookTime: 45,
        servings: 4,
        difficulty: 'MEDIUM',
        benefits: ['Heals gut lining', 'Reduces leaky gut', 'Provides collagen'],
        ingredients: ['Bone broth', 'Ginger', 'Turmeric', 'Carrots', 'Celery'],
        instructions: [
          'Heat bone broth in a large pot',
          'Add chopped vegetables and herbs',
          'Simmer for 30 minutes',
          'Season to taste and serve hot'
        ],
        gutHealthScore: 88,
        tags: ['Healing', 'Anti-inflammatory', 'Comfort'],
      }
    })
  ])

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Ultimate Gut Restore',
        brand: 'GutHealth Pro',
        type: 'PROBIOTIC',
        description: 'Advanced probiotic with 10 strains for digestive balance',
        benefits: ['Digestive balance', 'Immune support', 'Reduces bloating'],
        dosage: '2 capsules daily',
        price: 49.99,
        rating: 4.8,
        reviewCount: 1250,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Prebiotic Fiber Blend',
        brand: 'NaturalBalance',
        type: 'PREBIOTIC',
        description: 'Organic prebiotic fiber to feed beneficial bacteria',
        benefits: ['Feeds good bacteria', 'Improves regularity', 'Digestive comfort'],
        dosage: '1 scoop daily',
        price: 29.99,
        rating: 4.6,
        reviewCount: 890,
      }
    })
  ])

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12)
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@gutwise.app',
      name: 'Demo User',
      password: hashedPassword,
      profile: {
        create: {
          age: 32,
          gender: 'OTHER',
          height: 170,
          weight: 70,
          dietaryRestrictions: ['vegetarian'],
          allergies: ['dairy'],
          healthGoals: ['reduce bloating', 'improve energy', 'better digestion'],
          microbiomeScore: 75,
        }
      }
    }
  })

  // Create sample meals for demo user
  await prisma.meal.create({
    data: {
      userId: demoUser.id,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      portion: 'MEDIUM',
      mood: 4,
      notes: 'Felt good after eating',
      foods: {
        create: [
          {
            foodId: foods[0].id, // Apple
            quantity: 1,
            unit: 'piece'
          },
          {
            foodId: foods[3].id, // Broccoli
            quantity: 1,
            unit: 'cup'
          }
        ]
      }
    }
  })

  // Create sample symptoms for demo user
  await prisma.symptom.create({
    data: {
      userId: demoUser.id,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      type: 'BLOATING',
      severity: 3,
      duration: 30,
      notes: 'Mild bloating after lunch',
      triggers: ['dairy'],
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('Demo user created:')
  console.log('  Email: demo@gutwise.app')
  console.log('  Password: demo123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })