
import React, { useEffect, useState } from 'react';
import './Addform.css';
import { MdCancel } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';


const Addform = ({pos,handle,movieID,edit}) => {
   const [iscancel,setIscanceled]=useState(false)
   const [singleMovie,setSingleMovie]=useState([])
  
   
  const [movieid,setMovieID]=useState('')
   const [title, setTitle] = useState('');
   const [tagline, setTagline] = useState('');
   const [genresString, setGenresString] = useState('');
   const [overview, setOverview] = useState('');
   const [posterImage,setPosterImage]=useState('')
   const [comments, setComments] = useState('I will watch it tomorrow');

    const imageBaseUrl="https://image.tmdb.org/t/p/w300"

  const handleclick=()=> handle(iscancel)
  useEffect(()=>{
    const fetchdata=async()=>{
      const response=await fetch(`https://api.themoviedb.org/3/movie/${movieID}?&append_to_response=videos,images&api_key=f701dee9e048e65c574e8d80d6097eec`)
      const jsonRes = await response.json();
      setSingleMovie(jsonRes);

            setTitle(jsonRes.title || '');
            setMovieID(jsonRes.id || 0)
            setTagline(jsonRes.tagline || '');
            setGenresString(jsonRes.genres ? jsonRes.genres.map(genre => genre.name).join(', ') : '');
            setOverview(jsonRes.overview || '');
          setPosterImage(`${imageBaseUrl}${jsonRes.poster_path}`)

    }
    fetchdata()
  },[movieID])
 


const handleSubmit = async (e) => {
  e.preventDefault();

  const movieData = {
    movieid,
    title,
    tagline,
    genresString,
    overview,
    comments,
    posterImage
  };
 
  const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
    

      
      
  const found = existingMovies.findIndex(element => element.movieid == movieID);
  if(found>=0){ 
    existingMovies.splice(found,1)
    localStorage.setItem('movies', JSON.stringify(existingMovies));

    handle(false)
    handleclick()
    
  }
  

  try {

   

    //save data in local storage
    const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
    

      existingMovies.push(movieData);
      localStorage.setItem('movies', JSON.stringify(existingMovies));
    
   


    


    handle(false)
    handleclick()
    toast.success(`${title} Movie added sucessfully`)

    
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

   

  return (
    <div className="addformmainpage" style={{ top: `${pos-45}px` }}>
    <div className="addForm">
      <h2>Add to Favourites</h2>
    
      <MdCancel  className='cancel' onClick={handleclick}/>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="conatinerForm">
            <div className="imageConatainer">
            <img src={`${imageBaseUrl}${singleMovie.poster_path}`} alt={singleMovie.title} className='imageform' />
            </div>
                <div className="innfoContainer">
                      <label>
                      Movie Title:
                      <input type="text" name="title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                    <label>
                        Movie Tagline:
                        <input type="text" name="title" value={tagline}  onChange={(e) => setTagline(e.target.value)}/>
                      </label>

                      <label>
                          Movie Genre:
                          <input type="text" name="title" value={genresString}  onChange={(e) => setGenresString(e.target.value)}/>

                        </label>

                        Movie Release date: <b>{singleMovie.release_date}</b> &nbsp;&nbsp;
                        Movie Runtime: <b>{singleMovie.runtime} min</b>
                        <br />
                        <br />

                        <div>
                            <label>
                              Movie Overview:
                            
                              <textarea name="comments" value={overview} rows={5}
                                onChange={(e) => setOverview(e.target.value)}></textarea>
                            </label>
                       </div>

                        

                </div>


          </div>
        
       
          
        </div>
        

        <div>
          <label>
            Comments:
            <textarea name="comments" value={comments}
                                onChange={(e) => setComments(e.target.value)}></textarea>
          </label>
        </div>
        <button type="submit" >Add</button>
        
      </form>
    </div>
    </div>
  );
};

export default Addform;
