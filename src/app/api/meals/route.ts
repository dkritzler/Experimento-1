import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { mealSchema } from '@/lib/validation'

// GET /api/meals - Get user's meals
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = {
      userId: session.user.id,
      ...(startDate && endDate && {
        timestamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        }
      })
    }

    const [meals, total] = await Promise.all([
      prisma.meal.findMany({
        where,
        include: {
          foods: {
            include: {
              food: {
                include: {
                  nutritionalInfo: true
                }
              }
            }
          }
        },
        orderBy: { timestamp: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.meal.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: meals,
        total,
        page,
        pageSize: limit,
        hasMore: total > page * limit
      }
    })

  } catch (error) {
    console.error('Get meals error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/meals - Create new meal
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate request body
    const validation = mealSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { foods, portion, mood, notes } = validation.data

    // Create meal with foods
    const meal = await prisma.meal.create({
      data: {
        userId: session.user.id,
        timestamp: new Date(),
        portion: portion.toUpperCase() as any,
        mood,
        notes,
        foods: {
          create: await Promise.all(foods.map(async (foodData) => {
            // Find or create food
            let food = await prisma.food.findFirst({
              where: { name: foodData.name }
            })

            if (!food) {
              food = await prisma.food.create({
                data: {
                  name: foodData.name,
                  category: 'PROCESSED', // Default category
                  allergens: [],
                  commonTriggers: [],
                  nutritionalInfo: {
                    create: {
                      calories: 200, // Mock data
                      protein: 10,
                      carbs: 30,
                      fat: 5,
                      fiber: 3,
                      sugar: 5,
                    }
                  }
                }
              })
            }

            return {
              foodId: food.id,
              quantity: foodData.quantity,
              unit: foodData.unit,
            }
          }))
        }
      },
      include: {
        foods: {
          include: {
            food: {
              include: {
                nutritionalInfo: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Meal logged successfully',
      data: meal
    })

  } catch (error) {
    console.error('Create meal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}