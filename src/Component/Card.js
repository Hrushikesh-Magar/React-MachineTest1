import React from "react";
import { Link } from "react-router-dom";

const Card = (movie) => {
  console.log(movie.info);
  let img_path = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <div className="movie">
      <Link to={`/movie/${movie.info.id}`}>

        <img src={img_path + movie.info.poster_path} className="poster"></img>
        <div className="movie-details">
          <div className="Box">
              <h6 className="Title text-white"> {movie.info.title}</h6>
            <p className="rating text-white">{movie.info.vote_average}</p>
          </div>

          <div className="overview">
                        <h1>Overview</h1>
                        {movie.info.overview}
                    </div>
        </div>
        </Link>

      </div>
      
    </>
    
  );
  
};
export default Card;
