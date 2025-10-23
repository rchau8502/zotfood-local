import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function isYesterday(d: Date, now = new Date() ){
  const y = new Date(now); y.setDate(now.getDate()-1)
  return d.getFullYear()===y.getFullYear() && d.getMonth()===y.getMonth() && d.getDate()===y.getDate()
}

export async function POST(req: NextRequest){
  const { userId, lessonId, xp = 10 } = await req.json()
  if (!userId || !lessonId) return NextResponse.json({ error: 'userId and lessonId required' }, { status: 400 })

  await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed: true, xp: { increment: xp } },
    create: { userId, lessonId, completed: true, xp }
  })

  const user = await prisma.user.findUnique({ where: { id: userId } })
  let streak = 1
  if (user){
    if (isYesterday(user.lastActive)) streak += 1
    await prisma.user.update({ where: { id: userId }, data: { lastActive: new Date() } })
  }
  return NextResponse.json({ ok: true, streak })
}
