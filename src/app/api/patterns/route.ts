import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// GET /api/patterns - Get user's patterns
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const patterns = await prisma.pattern.findMany({
      where: { userId: session.user.id },
      orderBy: { confidence: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: patterns
    })

  } catch (error) {
    console.error('Get patterns error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/patterns/analyze - Analyze patterns (mock AI analysis)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's meals and symptoms for analysis
    const [meals, symptoms] = await Promise.all([
      prisma.meal.findMany({
        where: { userId: session.user.id },
        include: {
          foods: {
            include: { food: true }
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 50, // Last 50 meals
      }),
      prisma.symptom.findMany({
        where: { userId: session.user.id },
        orderBy: { timestamp: 'desc' },
        take: 50, // Last 50 symptoms
      })
    ])

    // Simple pattern detection logic (mock AI)
    const patterns = []
    
    // Mock pattern: Dairy correlation
    const dairyMeals = meals.filter(meal => 
      meal.foods.some(f => f.food.category === 'DAIRY')
    )
    const bloatingSymptoms = symptoms.filter(s => s.type === 'BLOATING')
    
    if (dairyMeals.length > 0 && bloatingSymptoms.length > 0) {
      const pattern = await prisma.pattern.upsert({
        where: {
          userId_trigger: {
            userId: session.user.id,
            trigger: 'Dairy Products'
          }
        },
        update: {
          confidence: Math.min(95, (dairyMeals.length / meals.length) * 100),
          occurrences: dairyMeals.length,
          lastSeen: new Date(),
        },
        create: {
          userId: session.user.id,
          type: 'CORRELATION',
          trigger: 'Dairy Products',
          response: 'Bloating',
          confidence: (dairyMeals.length / meals.length) * 100,
          occurrences: dairyMeals.length,
          firstSeen: new Date(),
          lastSeen: new Date(),
        }
      })
      patterns.push(pattern)
    }

    return NextResponse.json({
      success: true,
      message: 'Pattern analysis completed',
      data: {
        patterns,
        recommendations: [
          'Consider reducing dairy intake',
          'Try lactose-free alternatives',
          'Monitor symptoms after dairy consumption'
        ],
        healthScore: Math.max(60, 100 - (symptoms.length * 2))
      }
    })

  } catch (error) {
    console.error('Pattern analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}