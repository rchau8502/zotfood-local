import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest){
  const { userId, title, bodyMd, image } = await req.json()
  if (!userId || !title) return NextResponse.json({ error: 'userId and title required' }, { status: 400 })
  const s = await prisma.submission.create({ data: { userId, title, bodyMd: bodyMd ?? '', image } })
  return NextResponse.json({ id: s.id, status: s.status })
}
