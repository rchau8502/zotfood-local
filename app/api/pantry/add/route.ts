import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest){
  const { userId, ingredientId } = await req.json()
  if (!userId || !ingredientId) return NextResponse.json({ error: 'userId and ingredientId required' }, { status: 400 })
  const item = await prisma.pantry.upsert({
    where: { userId_ingredientId: { userId, ingredientId } },
    update: {},
    create: { userId, ingredientId }
  })
  return NextResponse.json({ ok: true, id: item.id })
}
