import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import CartContextProvider from "./store/CartContext.jsx"
import './index.css'
import { UserProgessContextProvider } from './store/UserProgessContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProgessContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserProgessContextProvider>
  </React.StrictMode>,
)
