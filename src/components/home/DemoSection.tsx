import { awards, demoBenefits } from '../../data/content'
import { cx } from '../../lib/cx'
import DemoForm from '../DemoForm'
import Placeholder from '../Placeholder'
import s from './DemoSection.module.css'

export default function DemoSection() {
  return (
    <section className={s.section} id="demo">
      <div className={cx('container', s.grid)}>
        <div className={s.copy}>
          <div className="eyebrow">Connect with us</div>
          <h2 className={s.title}>We'd love to show you around.</h2>
          <p className={s.intro}>With Smartwatch you can:</p>
          <ul className="checklist checklist--lg">
            {demoBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className={s.awards}>
            <div className={s.awardsLabel}>Voted best in class across the board</div>
            <div className={s.awardsGrid}>
              {awards.map((award) => (
                <Placeholder key={award} label={award} radius={12} stripe={8} className={s.award} />
              ))}
            </div>
          </div>
        </div>
        <DemoForm />
      </div>
    </section>
  )
}
