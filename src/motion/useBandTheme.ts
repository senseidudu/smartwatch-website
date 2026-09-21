import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type Band = 'dark' | 'light'

/** The header's height from the stylesheet, the floor for the probe line. */
function headerHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  const px = parseFloat(raw)
  return Number.isFinite(px) ? px : 64
}

/**
 * Where the header's bottom edge is right now. At the top of the page the announcement bar holds
 * the header below its stylesheet height, so the measured edge is used whenever it is lower; the
 * stylesheet height covers a header that cannot be measured (jsdom reports an empty rect).
 */
function probeLine(): number {
  const header = document.querySelector('header')
  const bottom = header ? header.getBoundingClientRect().bottom : 0
  return Math.max(bottom, headerHeight())
}

/**
 * Which `[data-band]` section sits just below the header's bottom edge. Later bands paint over
 * earlier ones (the first panel climbs across the pinned hero, and panels overlap the band above
 * them), so the last band spanning the line wins. Null when nothing spans it, as during overscroll.
 */
function bandUnderHeader(): Band | null {
  const line = probeLine()
  let found: Band | null = null
  document.querySelectorAll<HTMLElement>('[data-band]').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top <= line && rect.bottom > line) found = el.dataset.band === 'dark' ? 'dark' : 'light'
  })
  return found
}

/**
 * The colour of the section under the header, so the bar can take its background while the page
 * scrolls. Pages open on a light band (the layout's white base), which is the starting value. Lenis owns scrolling and
 * its event is the primary source; the native listener is the fallback, and layout changes that
 * move sections without a scroll (route changes, images loading) are caught as well.
 */
export function useBandTheme(): Band {
  const [band, setBand] = useState<Band>('light')
  const { pathname } = useLocation()

  useLenis(() => setBand((current) => bandUnderHeader() ?? current), [])

  useEffect(() => {
    const update = () => setBand((current) => bandUnderHeader() ?? current)
    // The new page's sections are in the DOM, but the scroll manager resets the position after this.
    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [pathname])

  return band
}
