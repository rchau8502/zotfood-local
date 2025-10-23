import Link from 'next/link'
import type { Recipe, RecipeIngredient } from '@prisma/client'

export default function RecipeCard({ recipe }: { recipe: Recipe & { ingredients: RecipeIngredient[] } }){
  return (
    <Link href={`/recipes/${recipe.slug}`} className="border rounded-lg p-3 grid gap-2 hover:shadow">
      {recipe.image ? <img src={recipe.image} alt="" className="w-full h-40 object-cover rounded"/> : null}
      <div className="font-semibold">{recipe.title}</div>
      <div className="text-sm opacity-80">⏱ {recipe.minutes} min • 💵 ${(recipe.costCents/100).toFixed(2)}</div>
      <div className="flex gap-2">
        <span className="badge">Serves {recipe.servings}</span>
      </div>
    </Link>
  )
}
