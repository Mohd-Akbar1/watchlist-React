import React, { useEffect, useState } from 'react';
import './watchlist.css';
import Nav from '../navbar/Nav';
import Footer from '../footer/Footer';
import { MdDeleteForever } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Addform from '../AddForm/Addform';
import toast, { Toaster } from 'react-hot-toast';

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [editable,setEditable]=useState(false)
  const [id,setID]=useState(0)

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(savedMovies);
    
  }, [editable]);

  
  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    toast.error('Movie deleted sucessfully')
  };

  const handleEdit = (index) => {
    setEditable(!editable)
    setID(index)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  };

  return (
    <>
      <Nav />
      <div className='watchlist1'>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className='movieItem'>
              <img src={movie.posterImage} alt={movie.title} className='moviePoster' />
              <div className='movieDetails'>
                <h3>{movie.title}</h3>
                <p><strong>Tagline:</strong> {movie.tagline}</p>
                <p><strong>Genres:</strong> {movie.genresString}</p>
                <p><strong>Overview:</strong> {movie.overview}</p>
                <p><strong>Comments:</strong> {movie.comments}</p>
                <div className='movieActions'>
                 
                  <LuClipboardEdit className=' edit'  onClick={() => handleEdit(movie.movieid)}/>
                 <MdDeleteForever onClick={() => handleDelete(index)} className='delete' />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies in your watchlist.</p>
        )}
      </div>
      {editable && <Addform movieID={id} handle={handleEdit} edit={true} />}
      <Footer />
    </>
  );
};

export default WatchList;
