import { useId } from 'react'
import { cx } from '../../lib/cx'

/*
 * Vendored from the VengeanceUI registry:
 * https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/morph-text.json
 *
 * `npx shadcn add` was not used because this project has no shadcn setup and no Tailwind,
 * so the CLI would have installed Tailwind and rewritten the config. Three adaptations:
 *   - `cn` from "@/lib/utils" becomes this project's `cx`
 *   - Tailwind utility class strings are dropped (they are inert without Tailwind); layout
 *     comes from the inline styles the component already ships, plus the caller's className
 *   - the hard-coded Space Grotesk @import and font-family default become `inherit`, so the
 *     text uses the site typeface
 *
 * Two fixes so it works inline at body size rather than only as a giant display block:
 *   - the blur steps are in `em`, not a fixed 20px. At the original clamp(3rem, 15vw, 10rem)
 *     size 20px was a fraction of a glyph; at 20px text it erased the word entirely.
 *   - the hidden width sizer is `nowrap`, otherwise the inline-block shrink-to-fits to the
 *     space left on the line and wraps, so the reserved width is too narrow.
 * A prefers-reduced-motion guard is added: the global reduced-motion rule collapses animation
 * duration, which would otherwise leave every word parked on its final (invisible) keyframe.
 */

export interface MorphTextProps {
  /** Words or phrases to cycle through. */
  words?: string[]
  /** How long each word is displayed, in ms. */
  interval?: number
  /** Optional subtext rendered beneath the morphing word. */
  subtext?: string
  /** Font size as a CSS value. */
  fontSize?: string
  /** Font family. Defaults to the surrounding text. */
  fontFamily?: string
  /** Peak blur of a word as it enters and leaves, relative to the font size. */
  blur?: string
  className?: string
  textClassName?: string
  subtextClassName?: string
}

export function MorphText({
  words = ['CREATE', 'DESIGN', 'DEVELOP'],
  interval = 3000,
  subtext,
  fontSize = 'inherit',
  fontFamily = 'inherit',
  blur = '0.35em',
  className,
  textClassName,
  subtextClassName,
}: MorphTextProps) {
  // Unique id so multiple instances don't share filter ids
  const uid = useId().replace(/:/g, '')
  const filterId = `morph-threshold-${uid}`

  const totalDuration = (interval / 1000) * words.length
  const wordDuration = interval / 1000

  const wordStyles = words.map((_, i) => ({
    animationDelay: `${i * wordDuration}s`,
    animationDuration: `${totalDuration}s`,
  }))

  return (
    <span className={cx('morph-text-root', className)}>
      {/* Threshold filter that fuses the blurred glyphs as they cross over */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <span
        className={cx('morph-text-container', textClassName)}
        style={{ fontSize, fontWeight: 700, filter: `url(#${filterId})`, fontFamily }}
      >
        <span className="morph-word-rotator" style={{ height: '1.2em', ['--morph-blur' as string]: blur }}>
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="morph-word"
              style={{
                opacity: 0,
                whiteSpace: 'nowrap',
                animationName: 'morph-word-rotate',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationFillMode: 'both',
                ...wordStyles[i],
              }}
            >
              {word}
            </span>
          ))}
          {/* Reserves the width of the widest word so the line never reflows. Every word is
              stacked in the same grid cell, so the reservation is the real rendered width
              rather than the longest string, which is not the same thing. */}
          <span className="morph-word-sizer" aria-hidden="true">
            {words.map((word, i) => (
              <span key={`sizer-${word}-${i}`}>{word}</span>
            ))}
          </span>
        </span>
      </span>

      {subtext && (
        <p
          className={cx('morph-subtext', subtextClassName)}
          style={{ opacity: 0, animation: 'morph-fade-up 1s ease-out 1s forwards', fontFamily }}
        >
          {subtext}
        </p>
      )}

      <style>{`
        /* max-content all the way down, not shrink-to-fit, so the reserved width is the
           longest word rather than whatever space happened to be left on the line. */
        .morph-text-root { position: relative; display: inline-block; width: max-content; }
        .morph-text-container { display: inline-block; width: max-content; }
        .morph-word-rotator { position: relative; display: inline-block; white-space: nowrap; width: max-content; }
        .morph-word-sizer { visibility: hidden; white-space: nowrap; display: inline-grid; }
        .morph-word-sizer > span { grid-area: 1 / 1; }
        .morph-word { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }

        @keyframes morph-word-rotate {
          0% { opacity: 0; filter: blur(var(--morph-blur)); transform: translate(-50%, -50%) scale(0.8); }
          5% { opacity: 0.5; filter: blur(calc(var(--morph-blur) / 2)); }
          15%, 35% { opacity: 1; filter: blur(0px); transform: translate(-50%, -50%) scale(1); }
          45% { opacity: 0.5; filter: blur(calc(var(--morph-blur) / 2)); }
          50%, 100% { opacity: 0; filter: blur(var(--morph-blur)); transform: translate(-50%, -50%) scale(1.2); }
        }

        @keyframes morph-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .morph-word { animation: none !important; filter: none !important; opacity: 0 !important; }
          .morph-word:first-of-type { opacity: 1 !important; }
        }
      `}</style>
    </span>
  )
}

export default MorphText
