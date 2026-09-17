import { Link } from 'react-router-dom'
import { routes } from '../data/site'
import s from './AnnouncementBar.module.css'

export default function AnnouncementBar() {
  return (
    <div className={s.bar}>
      <span className={s.text}>Introducing Driver Safety Dash Cameras</span>
      <Link to={routes.products} className={s.link}>
        Check it now <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
