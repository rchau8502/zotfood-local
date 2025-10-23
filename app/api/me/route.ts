import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(){
  const me = await prisma.user.findUnique({ where: { email: 'demo@uci.edu' } })
  // simple demo: streak as consecutive day (fake computation here)
  const streak = 5
  return NextResponse.json({ displayName: me?.displayName ?? 'Demo', streak, xp: 120 })
}
