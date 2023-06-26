import {useEffect,useState} from 'react'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from 'axios'
import Youtube from "react-youtube"
import "./RowPost.css"
function RowPost(props) {

  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState("")

  useEffect(() => {
    axios.get(props.url).then((response)=>{
        console.log(props.title,response.data);
        setMovies(response.data.results)
    })
    
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      https:"",
      autoplay: 1,
    },
  };
  const handleMovie = (id) =>{
    // console.log(id)
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US&=76600`).then((response) =>{
      if(response.data.results.lenght!==0){
        setUrlId(response.data.results[0])
        console.log(response)
      }else{
        console.log("array empty");
      }
    
    })
    
  }
  return (
    <div className='row'>
        <h1>{props.title}</h1>
        <div className='posters'>
          {movies.map((obj,i)=>
            <img key={i} onClick={() =>handleMovie(obj.id)} className={props.isSmall ? "smallposter" : 'poster'} alt="posters" src={`${imageUrl+obj.backdrop_path
            }`}/>

          )}

        </div>
       {urlId && <Youtube videoId={urlId.key} opts={opts}  />} 
    </div>
  )
}

export default RowPost