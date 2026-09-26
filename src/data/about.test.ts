import { describe, expect, test } from 'vitest'
import { about } from './about'

describe('About page awards', () => {
  test('shows the KPMG award and the KRA approval as two cards, each with its own logo kept whole', () => {
    const awards = about.sections.find((section) => section.id === 'awards')
    if (awards?.kind !== 'cards') throw new Error('expected the awards section to be cards')
    expect(awards.items.map((item) => item.title)).toEqual(['KPMG Top 100 Mid-Sized Companies', 'Approved KRA vendor'])
    expect(awards.items.map((item) => item.image?.alt)).toEqual([
      'KPMG Top 100 Mid-Sized Companies award badge',
      'Kenya Revenue Authority',
    ])
    expect(awards.items.every((item) => item.image?.fit === 'contain')).toBe(true)
  })
})
