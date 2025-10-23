import { prisma } from '@/lib/db'
import StepTimer from '@/components/ui/StepTimer'

export default async function RecipeDetail({ params }: { params: { slug: string } }){
  const recipe = await prisma.recipe.findUnique({ where: { slug: params.slug }, include: { steps: { orderBy: { index: 'asc' } }, ingredients: true } })
  if (!recipe) return <div>Not found</div>

  return (
    <article className="grid gap-4">
      <h1 className="text-2xl font-semibold">{recipe.title}</h1>
      <div className="text-sm opacity-80">Time: {recipe.minutes} min • Cost: ${(recipe.costCents/100).toFixed(2)} • Servings: {recipe.servings}</div>
      <section>
        <h2 className="font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map(ri => <li key={ri.id}>{ri.quantity} {ri.unit ?? ''}</li>)}
        </ul>
      </section>
      <section className="grid gap-3">
        <h2 className="font-semibold">Steps</h2>
        {recipe.steps.map(s => (
          <div key={s.id} className="p-3 rounded-lg border">
            <div className="font-medium">Step {s.index+1}</div>
            <p>{s.text}</p>
            {s.timerSec ? <StepTimer seconds={s.timerSec} /> : null}
          </div>
        ))}
      </section>
    </article>
  )
}
