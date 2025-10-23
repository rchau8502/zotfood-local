import type { Recipe, RecipeIngredient } from '@prisma/client'

export function scoreRecipe(
  recipe: Recipe & { ingredients: RecipeIngredient[] },
  userPantry: Set<string>,
  filters: { maxMinutes?: number; maxCostCents?: number; tools?: string[] } = {}
): number {
  const needed = recipe.ingredients.length || 1
  const have = recipe.ingredients.filter(ri => userPantry.has(ri.ingredientId)).length
  let score = (have / needed) * 100

  if (recipe.costCents <= 300) score += 10
  if (recipe.minutes <= 15) score += 10
  try {
    const tools: string[] = JSON.parse(recipe.tools || "[]")
    if (filters.tools && tools.some(t => filters.tools!.includes(t))) score += 5
  } catch { /* ignore parse errors */ }

  if (filters.maxMinutes && recipe.minutes > filters.maxMinutes) score -= 25
  if (filters.maxCostCents && recipe.costCents > filters.maxCostCents) score -= 25

  return Math.max(0, Math.round(score))
}
