import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'
import { DESKTOP_MOTION } from './motion'

/**
 * Scroll-linked depth for the hero, which is pinned on desktop while the next section climbs over it.
 * As that happens `data-scroll-copy` lifts away and fades, `data-scroll-media` sinks back and dims
 * behind the rising panel, the picture inside `data-scroll-slides` drifts within its frame, and
 * `data-scroll-float` rides up against the card. Everything is scrubbed to the scroll position with
 * a short lag, so it trails the wheel rather than snapping to it. Desktop only and skipped under
 * reduced motion, like the product-row parallax. The targets are wrappers, never the `data-enter`
 * elements, so this never fights the entrance tween.
 */
export function useHeroScroll(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(DESKTOP_MOTION, () => {
        const copy = el.querySelector('[data-scroll-copy]')
        const media = el.querySelector('[data-scroll-media]')
        const slides = el.querySelector('[data-scroll-slides]')
        const float = el.querySelector('[data-scroll-float]')
        // Runs from the very top of the page until the next section has climbed all the way over the
        // hero; tween durations are fractions of that range. The end is measured on that section, not
        // on the hero, because a sticky element reports positions ScrollTrigger cannot trust.
        const next = el.nextElementSibling
        const tl = gsap.timeline({
          defaults: { ease: 'none', duration: 1 },
          scrollTrigger: {
            trigger: el,
            start: 0,
            endTrigger: next ?? el,
            end: next ? 'top top' : 'bottom top',
            scrub: 0.5,
          },
        })
        if (copy) tl.to(copy, { y: -80, autoAlpha: 0, duration: 0.8, ease: 'power1.in' }, 0)
        if (media) tl.to(media, { y: 90, scale: 0.92, autoAlpha: 0.4 }, 0)
        if (slides) tl.fromTo(slides, { yPercent: -5 }, { yPercent: 5 }, 0)
        if (float) tl.to(float, { y: -40 }, 0)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
}
