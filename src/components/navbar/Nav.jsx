import React, { useContext, useState } from 'react'
import './nav.css'
import { CiSearch } from "react-icons/ci";  
import { CgProfile } from "react-icons/cg";
import {Link} from 'react-router-dom'
import { SearchContext } from '../searchcontext';


const Nav = () => {


  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleReload = () => {
    window.location.href = '/';
  };
  
 
  return (
    <div>
        <div className="header">
            <h2 onClick={handleReload} style={{cursor:'pointer'}}>Watchlist App</h2>
            <div className="searchContainer">
            <input type="text" className='searchBar' placeholder='search movie name...' onChange={e=>setSearchQuery(e.target.value)} />
            <CiSearch  className='magnigying'/>

            </div>
            <Link to={'/watchlist'}><p className='mylist'>WatchList</p></Link>
           
            <p className='profile' style={{cursor:'progress'}} ><CgProfile className='profileself' />John Doe</p>
            
        </div>
      
    </div>
  )
}

export default Nav
