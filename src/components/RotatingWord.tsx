import { useEffect, useState } from 'react'
import s from './RotatingWord.module.css'

type Props = {
  words: string[]
  /** Time each word stays on screen, in ms. */
  interval?: number
  /** Fade-out duration before the next word, in ms. */
  fade?: number
}

export default function RotatingWord({ words, interval = 2600, fade = 300 }: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let swap: ReturnType<typeof setTimeout> | undefined
    const tick = setInterval(() => {
      setVisible(false)
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, fade)
    }, interval)
    return () => {
      clearInterval(tick)
      if (swap) clearTimeout(swap)
    }
  }, [words.length, interval, fade])

  return (
    <strong className={s.word} style={{ opacity: visible ? 1 : 0, transitionDuration: `${fade}ms` }}>
      {words[index]}
    </strong>
  )
}
