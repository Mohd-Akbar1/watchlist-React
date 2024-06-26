import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import './App.css'
import Nav from './components/navbar/Nav'
import MovieList from './components/movieData/MovieList'
import Footer from './components/footer/Footer'
import WatchList from './components/mywatchlist/WatchList'




function App() {
  

  return (
   <BrowserRouter>
   <Routes>
   
    <Route path='/' element={<MovieList/>}/>
   
    <Route path='/watchlist' element={<WatchList/>}/>
    
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
