import { describe, it, expect } from 'vitest'
import { scoreRecipe } from '../lib/scoring'

describe('scoring', () => {
  it('all ingredients present yields >=100', () => {
    const recipe: any = { costCents: 200, minutes: 10, tools: '[]', ingredients: [{ ingredientId: '1' }] }
    const pantry = new Set(['1'])
    expect(scoreRecipe(recipe, pantry, {})).toBeGreaterThanOrEqual(100)
  })

  it('none present is near 0', () => {
    const recipe: any = { costCents: 500, minutes: 30, tools: '[]', ingredients: [{ ingredientId: '1' }, { ingredientId: '2' }] }
    const pantry = new Set(['x'])
    expect(scoreRecipe(recipe, pantry, {})).toBeLessThan(30)
  })
})
