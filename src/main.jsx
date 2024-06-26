import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import { SearchContext, SearchProvider } from './components/searchcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
   <SearchProvider>
    <App/>
    <Toaster />
   </SearchProvider>

 
)
