import { describe, it, expect } from 'vitest'
import { SYNONYMS } from '../lib/synonyms'

describe('synonyms', () => {
  it('has banana and variants', () => {
    expect(SYNONYMS.banana).toContain('bananas')
  })
})
