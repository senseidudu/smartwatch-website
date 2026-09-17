import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { routes } from './data/site'
import CompanyPage from './pages/CompanyPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SolutionsPage from './pages/SolutionsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={routes.products} element={<ProductsPage />} />
        <Route path={routes.solutions} element={<SolutionsPage />} />
        <Route path={routes.company} element={<CompanyPage />} />
        <Route path={routes.contact} element={<ContactPage />} />
        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Route>
    </Routes>
  )
}
