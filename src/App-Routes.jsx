import { Routes, Route } from 'react-router-dom'
import { App } from './App'


import { AppTodos, AppTic, AppCalc, AppInternetShop } from './App-main'


import { RoutingInternetShop } from './forms' 
import { 
  ProductPage,
  CategoryPage,
  ShopFilterPage, 
  FilteredProductsPage,
  FilteredPage,
  ProfilePage
} from './App-main/internet-shop/pages'
import { FormRegisterShop } from './forms'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={null} />

        <Route path="calculator" element={<AppCalc />} />
        <Route path="todos" element={<AppTodos />} />
        <Route path="tic" element={<AppTic />} />

        {/* 🛒 Интернет-магазин */}
        <Route path="shop" element={<AppInternetShop />}>
          <Route index element={<RoutingInternetShop />} />
          <Route path="login" element={<FormRegisterShop mode="login" />} />
  <Route path="register" element={<FormRegisterShop mode="register" />} />
  <Route path="/shop/filter" element={<FilteredPage />} />
  <Route path="/shop/filter" element={<ShopFilterPage />} />
<Route path="/shop/filtered" element={<FilteredProductsPage />} />

          <Route path="profile" element={<ProfilePage />} />
          <Route path="product/:id" element={<ProductPage />} />

          {/* category → brand → model */}
          <Route
            path="category/:category/:brand?/:model?"
            element={<CategoryPage />}
          />
        </Route>
      </Route>
    </Routes>
  )
}
