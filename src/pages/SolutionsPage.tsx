import Placeholder from '../components/Placeholder'
import { industries } from '../data/industries'
import { cx } from '../lib/cx'
import s from './SolutionsPage.module.css'

export default function SolutionsPage() {
  return (
    <>
      <section className={cx('container', s.intro)}>
        <div className="eyebrow">Solutions</div>
        <h1 className={cx('h-page', s.title)}>
          Built for the industries that keep East Africa moving.
        </h1>
        <p className={s.lead}>
          From oil and gas convoys to city buses and NGO field teams, Smartwatch adapts to how your
          operation runs.
        </p>
      </section>

      <section className={cx('container', s.gridWrap)}>
        <div className={s.grid}>
          {industries.map((industry) => (
            <a key={industry.name} href="#" className={s.card}>
              <Placeholder label={industry.image} ratio="16 / 10" radius={0} stripe={10} />
              <div className={s.cardBody}>
                <div className={s.cardName}>{industry.name}</div>
                <div className={s.cardText}>{industry.body}</div>
                <div className={s.cardMore}>Explore →</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={s.story}>
        <div className={cx('container', s.storyGrid)}>
          <div className={s.storyCopy}>
            <div className="eyebrow">Customer story</div>
            <h2 className="h-section">70% fewer accidents with instant alerts on violations.</h2>
            <p className="lead">
              A regional logistics operator cut incidents and fuel spend within one year of rolling
              out Smartwatch across its fleet.
            </p>
            <div>
              <a href="#" className="link-arrow">
                Read the story →
              </a>
            </div>
          </div>
          <Placeholder label="customer photo" ratio="4 / 3" />
        </div>
      </section>
    </>
  )
}
