import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest){
  const { userId, recipeId } = await req.json()
  if (!userId || !recipeId) return NextResponse.json({ error: 'userId and recipeId required' }, { status: 400 })

  const existing = await prisma.favorite.findUnique({ where: { userId_recipeId: { userId, recipeId } } })
  if (existing){
    await prisma.favorite.delete({ where: { id: existing.id } })
    return NextResponse.json({ favorited: false })
  } else {
    await prisma.favorite.create({ data: { userId, recipeId } })
    return NextResponse.json({ favorited: true })
  }
}
