import React, { useEffect, useState } from 'react'
import { API_KEY,imageUrl } from '../../constants/constants'
import axios from 'axios'
import Youtube from "react-youtube"
import "./Banner.css"

function Banner() {

  const [movie, setMovie] = useState();
  const [moviePlay, setMoviePlay] = useState();
  const [urlId, setUrlId] = useState("")


  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      https:"",
      autoplay: 1,
    },
  };

  useEffect(() => {
    const min = 1;
    const max = 21;
    const rand = Math.ceil(min + Math.random() * (max - min));
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`).then((response) =>{
      // console.log(response.data);
      setMovie(response.data.results[rand])
      setMoviePlay(response.data.results[rand])
      
    }).catch(err =>{
      alert("issue")
    })   
  }, [])

  const handleclick = () =>{
    console.log(moviePlay)
    axios.get(`https://api.themoviedb.org/3/movie/${moviePlay.id}/videos?api_key=${API_KEY}&language=en-US&=76600`).then((response) =>{
      if(response.data.results.lenght!==0){
        setUrlId(response.data.results[0])
        console.log(response)
      }else{
        console.log("array empty");
      }
    
    })
  }
  
  return (
    <div 
    style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
    className='banner'>
        <div className="content">
            <h1 className='title'>{movie ? movie.title : ""}</h1>
            <div className="banner-buttons">
                <button className='button' onClick={handleclick}>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 className='discription'>{movie ? movie.overview : ""}</h1>
        </div>
    <div className="fade-bottom"></div>
    {urlId && <div className="overlay">
      <Youtube videoId={urlId.key} opts={opts}  />
    </div>} 

    </div>
  )
}

export default Banner