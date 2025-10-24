import Link from 'next/link'
import { prisma } from '@/lib/db'
import RecipeCard from '@/components/ui/RecipeCard'

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default async function RecipesPage(){
  const recipes = await prisma.recipe.findMany({ include: { ingredients: true }, where: { approved: true }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Recipes</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  )
}
