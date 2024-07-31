

import { Routes,Route } from 'react-router-dom'


import HomePage from '../Pages/HomePage'
import Contact from '../Pages/Contact'
import About from '../Pages/About'
import PageNotFound from '../Pages/PageNotFound'
import Policy from '../Pages/Policy'
import Register from '../Pages/Auth/Register'

import Login from '../Pages/Auth/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import PrivateRoute from '../Component/Route/PrivateRoute'
import ForgotPassword from '../Pages/Auth/ForgotPassword'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import AdminRoutes from '../Component/Route/PrivateRoute'
import CreateCategory from '../Pages/Admin/CreateCategory'
import CreateProduct from '../Pages/Admin/CreateProduct'

import Users from '../Pages/Admin/User'
import Order from '../Pages/Dashboard/Order'
import Profile from '../Pages/Dashboard/Profile'
import Product from '../Pages/Admin/Product'
import UpdateProduct from '../Pages/Admin/UpdateProduct'
import Search from '../Pages/Search'
import ProductDetails from '../Pages/ProductDetails'
import Categories from '../Pages/Categories'
import CategoryProduct from '../Pages/CategorieProduct'
import CartPage from '../Pages/CartPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='/product/:slug' element={<ProductDetails/> } />
        <Route path='/categories' element={<Categories/> } />
        <Route path='/cart' element={<CartPage/> } />
        <Route path='/category/:slug' element={<CategoryProduct/> } />
        <Route path='/search' element={<Search/> } />
        <Route path='/register' element={<Register/> } />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={ <Dashboard/>} />
          <Route path='user/order' element={ <Order/>} />
          <Route path='user/profile' element={ <Profile/>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path='/login' element={<Login/> } />
        <Route path='/forgot-password' element={<ForgotPassword/> } />
        <Route path='/contact' element={<Contact/> } />
        <Route path='/about' element={<About/> } />
        <Route path='*' element={<PageNotFound/> } />
        <Route path='/policy' element={<Policy/> } />
     </Routes>
    
    </>
  )
}

export default App
