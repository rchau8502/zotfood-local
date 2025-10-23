import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest){
  const { submissionId, approve } = await req.json()
  const status = approve ? 'approved' : 'rejected'
  await prisma.submission.update({ where: { id: submissionId }, data: { status } })
  return NextResponse.json({ ok: true, status })
}
