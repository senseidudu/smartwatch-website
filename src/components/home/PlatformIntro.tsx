import { cx } from '../../lib/cx'
import s from './PlatformIntro.module.css'

export default function PlatformIntro() {
  return (
    <div className={cx('container', s.intro)}>
      <div className="eyebrow">Integrated fleet platform</div>
      <h2 className="h-section">A fully integrated suite of products, powered by industry-leading AI.</h2>
    </div>
  )
}
