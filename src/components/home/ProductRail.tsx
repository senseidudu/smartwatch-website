import { img } from '../../data/images'
import { pillars } from '../../data/pillars'
import { cx } from '../../lib/cx'
import Icon from '../Icon'
import Media from '../Media'
import s from './ProductRail.module.css'

/** Visual index of the product suite: seven tiles over the hardware image, each linking to its row. */
export default function ProductRail() {
  return (
    <div className={cx('container', s.wrap)}>
      <div className={s.band}>
        <Media image={img.products} ratio="21 / 9" radius={24} decorative className={s.bandMedia} />
        <nav className={s.rail} aria-label="Products">
          {pillars.map((p) => (
            <a key={p.slug} href={`#row-${p.slug}`} className={cx(s.tile, 'lift')}>
              <span className={s.tileIcon}>
                <Icon name={p.icon} size={24} />
              </span>
              <span className={s.tileName}>{p.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
