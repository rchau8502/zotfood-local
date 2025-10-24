import { NextRequest, NextResponse } from 'next/server'
import { saveUpload } from '@/lib/fs-upload'
import { prisma } from '@/lib/db'
import { SYNONYMS } from '@/lib/synonyms'

export async function POST(req: NextRequest){
  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'file required' }, { status: 400 })

  const url = await saveUpload(file)
  const filename = (file.name || '').toLowerCase()
  const tokens = filename.split(/[^a-z]+/g).filter(Boolean)

  let best: { ingredientId: string, label: string, conf: number } | null = null
  const candidates: any[] = []
  const all = await prisma.ingredient.findMany()

  for (const ing of all){
    const key = ing.name.toLowerCase()
    const syns = (SYNONYMS[key] ?? [key]).map(s => s.toLowerCase())
    let hit = 0
    for (const t of tokens){
      if (syns.includes(t)) hit += 1
    }
    const score = syns.length ? hit / syns.length : 0
    candidates.push({ ingredientId: ing.id, label: ing.name, conf: score })
    if (!best || score > best.conf) best = { ingredientId: ing.id, label: ing.name, conf: score }
  }

  candidates.sort((a,b)=>b.conf-a.conf)
  const top = candidates.slice(0,3)

  const conf = best?.conf ?? 0
  return NextResponse.json({
    imageUrl: url,
    ingredientId: conf >= 0.7 ? best!.ingredientId : null,
    confidence: conf,
    alternatives: conf >= 0.7 ? [] : top
  })
}
