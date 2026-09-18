import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import { about } from './data/about'
import { hardware } from './data/hardware'
import { privacy, terms } from './data/legal'
import { platforms } from './data/platforms'
import { findProduct } from './data/products'
import { routes } from './data/site'
import { findSolution } from './data/solutions'
import ContactPage from './pages/ContactPage'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import ProductsPage from './pages/ProductsPage'
import SolutionsPage from './pages/SolutionsPage'

function ProductRoute() {
  const { slug = '' } = useParams()
  const page = findProduct(slug)
  return page ? <DetailPage key={page.slug} page={page} /> : <Navigate to={routes.products} replace />
}

function SolutionRoute() {
  const { slug = '' } = useParams()
  const page = findSolution(slug)
  return page ? <DetailPage key={page.slug} page={page} /> : <Navigate to={routes.solutions} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.products} element={<ProductsPage />} />
        <Route path={`${routes.products}/:slug`} element={<ProductRoute />} />
        <Route path={routes.solutions} element={<SolutionsPage />} />
        <Route path={`${routes.solutions}/:slug`} element={<SolutionRoute />} />
        <Route path={routes.hardware} element={<DetailPage page={hardware} />} />
        <Route path={routes.platforms} element={<DetailPage page={platforms} />} />
        <Route path={routes.about} element={<DetailPage page={about} />} />
        <Route path={routes.company} element={<Navigate to={routes.about} replace />} />
        <Route path={routes.contact} element={<ContactPage />} />
        <Route path={routes.privacy} element={<LegalPage doc={privacy} />} />
        <Route path={routes.terms} element={<LegalPage doc={terms} />} />
        <Route path="/terms-and-conditions" element={<Navigate to={routes.terms} replace />} />
        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Route>
    </Routes>
  )
}
