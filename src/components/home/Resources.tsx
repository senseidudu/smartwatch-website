import { featuredPost, posts } from '../../data/content'
import { cx } from '../../lib/cx'
import Placeholder from '../Placeholder'
import s from './Resources.module.css'

export default function Resources() {
  return (
    <section className={cx('container', s.section)}>
      <div className={s.head}>
        <h2 className="h-section">Discover what's new with Smartwatch.</h2>
        <a href="#" className="link-arrow">
          View all resources →
        </a>
      </div>
      <div className={s.grid}>
        <a href="#" className={s.feature}>
          <Placeholder label={featuredPost.image} ratio="16 / 9" radius={0} />
          <div className={s.featureBody}>
            <div className="eyebrow">{featuredPost.kind}</div>
            <div className={s.featureTitle}>{featuredPost.title}</div>
            <div className={s.featureText}>{featuredPost.body}</div>
          </div>
        </a>
        <div className={s.list}>
          {posts.map((post) => (
            <a key={post.title} href="#" className={s.post}>
              <Placeholder label="" ratio="4 / 3" radius={12} stripe={8} className={s.thumb} />
              <div className={s.postBody}>
                <div className={s.kind}>{post.kind}</div>
                <div className={s.postTitle}>{post.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
