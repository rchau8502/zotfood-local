import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { scoreRecipe } from '@/lib/scoring'

export async function POST(req: NextRequest){
  const { pantryIds = [], filters = {} } = await req.json()
  const set = new Set<string>(pantryIds)
  const recipes = await prisma.recipe.findMany({ include: { ingredients: true }, where: { approved: true } })
  const scored = recipes.map(r => ({ recipe: r, score: scoreRecipe(r, set, filters) }))
  scored.sort((a,b)=>b.score-a.score)
  return NextResponse.json(scored.slice(0, 20))
}
