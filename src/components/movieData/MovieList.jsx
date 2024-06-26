import React, { useContext, useEffect, useRef, useState } from 'react'
import './movielist.css'
import { IoIosHeart } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import Addform from '../AddForm/Addform.jsx';
import Nav from '../navbar/Nav.jsx';
import Footer from '../footer/Footer.jsx';
import { SearchContext } from '../searchcontext.jsx';

const MovieList = () => {
    const [data,setdata]=useState([])
    const [addData,setData]=useState(false)
    const [movieId,setMovieId]=useState(0)
    // const scrollPosition=useRef(0)
    const [scrollPosition, setScrollPosition] = useState(0);

    const { searchQuery } = useContext(SearchContext);


    const handleClick=(e)=>{
      setData(!addData)
      const position = window.scrollY;
   
    setScrollPosition(position);
    setMovieId(e)
    }
    

    const apibaseUrl="https://api.themoviedb.org/3";
    const apikey='f701dee9e048e65c574e8d80d6097eec';
    const imageBaseUrl="https://image.tmdb.org/t/p/w300"

    useEffect(()=>{
        const Fetchdata=async()=>{
          var endParameter=`${apibaseUrl}/movie/now_playing?api_key=${apikey}`
          if(searchQuery){
            
            
            var endParameter=`${apibaseUrl}/search/movie?api_key=${apikey}&query=${searchQuery}`
          }
            
            const response=await fetch(endParameter)
            const jsonresponse=await response.json()
            const movies= jsonresponse.results
            setdata(movies)
        }
        Fetchdata()

    },[searchQuery])
    
  return (
    <div className='movieListDisplay'>
      <Nav/>
    <p className='nowplaying'>{data.length>0?'Now playing ...':'movie not found ?'}</p>
    <div className='mainPage'>
      {
        data.map((movie,id)=>(
            <div className="movie-card" key={id}>
            <img 
              src={movie.poster_path 
                ? `${imageBaseUrl}${movie.poster_path}` 
                : "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg"} 
              alt={movie.title} 
              className='imageBase' 
            />
                
                <div className="tag">
                <p>{movie.title}</p>
                <IoIosHeart className='heart' data-tip="Add to favourite" onClick={()=>handleClick(movie.id)} />
               </div>
                 
               
            </div>
        ))
      }
      {addData && <Addform pos={scrollPosition} handle={handleClick} movieID={movieId}/>}
      
    </div>
    <Tooltip />

    <Footer/>
  </div>
  )
}

export default MovieList
