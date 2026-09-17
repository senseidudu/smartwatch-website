import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Footer from './Footer'
import Header from './Header'
import RegionToast from './RegionToast'
import s from './Layout.module.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
      <RegionToast />
      <Footer />
    </>
  )
}
