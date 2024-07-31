import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { AuthProvider } from './Context/auth.jsx'
import "antd/dist/reset.css"
import { SearchProvider } from './Context/SearchAuth.jsx'
import { CartProvider } from './Context/cartContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchProvider>
    <CartProvider>
    <AuthProvider>
      <BrowserRouter>

        <App />
   
      </BrowserRouter>
      </AuthProvider>
      </CartProvider>
  </SearchProvider>
);
