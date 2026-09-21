import { useEffect, useRef, useState } from 'react'
import { video } from '../../data/images'
import { cx } from '../../lib/cx'
import { ScrollTrigger, useGSAP } from '../../motion/gsap'
import { prefersReducedMotion } from '../../motion/motion'
import Reveal from '../Reveal'
import VideoModal from '../VideoModal'
import s from './PlatformIntro.module.css'

export default function PlatformIntro() {
  const [open, setOpen] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLVideoElement>(null)
  /** Read inside the ScrollTrigger callback, which outlives any single render. */
  const state = useRef({ open: false, visible: false })
  const reduced = prefersReducedMotion()

  // The silent loop only runs while the frame is on screen.
  useGSAP(
    () => {
      const frame = frameRef.current
      const clip = clipRef.current
      if (!frame || !clip || reduced) return
      const sync = (visible: boolean) => {
        state.current.visible = visible
        if (visible && !state.current.open) clip.play()?.catch?.(() => {})
        else clip.pause()
      }
      const trigger = ScrollTrigger.create({
        trigger: frame,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => sync(self.isActive),
      })
      // onToggle only reports a change, so seed the state for a frame that is already on screen.
      sync(trigger.isActive)
      return () => trigger.kill()
    },
    { scope: frameRef, dependencies: [reduced] },
  )

  // The modal plays the same file with sound, so the silent loop stands down while it is up.
  useEffect(() => {
    state.current.open = open
    const clip = clipRef.current
    if (!clip || reduced) return
    if (open) clip.pause()
    else if (state.current.visible) clip.play()?.catch?.(() => {})
  }, [open, reduced])

  return (
    <Reveal className={cx('container', s.intro)}>
      <div className="eyebrow">Integrated fleet platform</div>
      <h2 className="h-section">A fully integrated suite of products, powered by industry-leading AI.</h2>
      <div className={s.frame} ref={frameRef}>
        <video
          ref={clipRef}
          className={s.clip}
          src={video.platform.src}
          poster={video.platform.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <button type="button" className={s.play} onClick={() => setOpen(true)}>
          <span className={s.playIcon} aria-hidden="true">
            ▶
          </span>
          Watch with sound
        </button>
      </div>
      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        src={video.platform.src}
        poster={video.platform.poster}
        title={video.platform.title}
      />
    </Reveal>
  )
}
