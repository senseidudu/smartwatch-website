import { cx } from '../../lib/cx'
import Reveal from '../Reveal'
import s from './PlatformIntro.module.css'

export default function PlatformIntro() {
  return (
    <Reveal className={cx('container', s.intro)}>
      <div className="eyebrow">Integrated fleet platform</div>
      <h2 className="h-section">A fully integrated suite of products, powered by industry-leading AI.</h2>
    </Reveal>
  )
}
