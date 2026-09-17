import ContactForm from '../components/ContactForm'
import { offices, site } from '../data/site'
import { cx } from '../lib/cx'
import s from './ContactPage.module.css'

export default function ContactPage() {
  return (
    <div className={s.page}>
      <section className={cx('container', s.grid)}>
        <div className={s.copy}>
          <div className={s.intro}>
            <div className="eyebrow">Contact</div>
            <h1 className={cx('h-page', s.title)}>Talk to sales or support, 24/7.</h1>
            <p className={s.lead}>
              Request a demo, ask about pricing, or get help with an installed device.
            </p>
          </div>
          <div className={s.offices}>
            {offices.map((office) => (
              <div key={office.city} className={s.office}>
                <div className={s.officeCity}>{office.city}</div>
                <div className={s.officeAddr}>{office.addr}</div>
                <a href={office.telHref} className={s.officeTel}>
                  {office.tel}
                </a>
              </div>
            ))}
          </div>
          <div className={s.support}>
            <div className={s.supportLabel}>Support</div>
            <a href={`mailto:${site.email}`} className={s.supportLink}>
              {site.email}
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  )
}
