import { Link } from 'react-router-dom'
import Placeholder from '../components/Placeholder'
import { productFeatures } from '../data/content'
import { pillars } from '../data/pillars'
import { routes } from '../data/site'
import { cx } from '../lib/cx'
import s from './ProductsPage.module.css'

export default function ProductsPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={cx('container', s.heroGrid)}>
          <div className={s.heroCopy}>
            <div className="eyebrow eyebrow--bright">Products · Driver Safety</div>
            <h1 className="h-page">
              Protect your fleet and profits with an all-in-one safety solution.
            </h1>
            <p className={s.heroLead}>
              Video surveillance, passenger information, AI analytics and people counting, dispatch
              system and terminal with ticket system.
            </p>
            <div className={s.actions}>
              <Link to={routes.contact} className="btn btn--primary">
                Get a demo
              </Link>
              <a href="#" className="btn btn--outline-light">
                Download spec sheet
              </a>
            </div>
          </div>
          <Placeholder label="dash camera hardware, hero shot" ratio="4 / 3" dark />
        </div>
      </section>

      <section className={cx('container', s.features)}>
        {productFeatures.map((feature, i) => (
          <div key={feature.label} className={cx(s.feature, i % 2 === 1 && s.featureReverse)}>
            <Placeholder label={feature.image} ratio="4 / 3" className={s.featureImage} />
            <div className={s.featureCopy}>
              <div className="eyebrow">{feature.label}</div>
              <h2 className={s.featureTitle}>{feature.headline}</h2>
              <p className="lead">{feature.body}</p>
              <div className={s.points}>
                {feature.points.map((point) => (
                  <div key={point.title} className={s.point}>
                    <div className={s.pointTitle}>{point.title}</div>
                    <div className={s.pointBody}>{point.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={s.platform}>
        <div className={cx('container', s.platformInner)}>
          <h2 className="h-section">Works with the rest of the platform.</h2>
          <div className={s.platformGrid}>
            {pillars.map((p) => (
              <a key={p.name} href="#" className={s.platformCard}>
                <div className={s.platformName}>{p.name}</div>
                <div className={s.platformShort}>{p.short}</div>
                <div className={s.platformMore}>Learn more →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={cx('container', s.ctaWrap)}>
        <div className={s.cta}>
          <div className={s.ctaCopy}>
            <h2 className="h-section">See dash cameras in action.</h2>
            <p className={s.ctaText}>A 30-minute walkthrough with our Kampala or Nairobi team.</p>
          </div>
          <Link to={routes.contact} className="btn btn--primary">
            Get a demo
          </Link>
        </div>
      </section>
    </>
  )
}
