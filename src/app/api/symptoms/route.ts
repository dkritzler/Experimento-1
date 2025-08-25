import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { symptomSchema } from '@/lib/validation'

// GET /api/symptoms - Get user's symptoms
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
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = {
      userId: session.user.id,
      ...(startDate && endDate && {
        timestamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        }
      }),
      ...(type && { type: type.toUpperCase() })
    }

    const [symptoms, total] = await Promise.all([
      prisma.symptom.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.symptom.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: symptoms,
        total,
        page,
        pageSize: limit,
        hasMore: total > page * limit
      }
    })

  } catch (error) {
    console.error('Get symptoms error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/symptoms - Create new symptom
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
    const validation = symptomSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { type, severity, duration, notes, triggers } = validation.data

    const symptom = await prisma.symptom.create({
      data: {
        userId: session.user.id,
        timestamp: new Date(),
        type: type.toUpperCase() as any,
        severity,
        duration,
        notes,
        triggers: triggers || [],
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Symptom logged successfully',
      data: symptom
    })

  } catch (error) {
    console.error('Create symptom error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}