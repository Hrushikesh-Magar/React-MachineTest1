import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css"; 

const Movie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [cast, setCast] = useState([]);
  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const APIKey = "7b71ae6a31166f96347f9ed964916122";

  const getMovieDataById = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}`
      );
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieCastById = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKey}&language=en-US`
      );
      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDataById();
    getMovieCastById();
  }, [id]);

  return (
    <div className="movie-container">
      {movieData && (
        <>
          <div className="movie-details">
            <h1 className="movie-title">{movieData.title}</h1>
            <img
              src={imgPath + movieData.backdrop_path}
              className="movie-poster"
              alt={movieData.title}
            />
            <div className="movie-info">
              <p className="movie-rating">Rating: {movieData.vote_average}</p>
              <p className="movie-release-date">Release Date: {movieData.release_date}</p>
            </div>
            <p className="movie-overview">Overview: {movieData.overview}</p>
          </div>
          <div className="cast-container">
            <h2 className="cast-heading">Cast</h2>
            <div className="cast-images">
              {cast.map(actor => (
                <div key={actor.id} className="cast-item">
                  {actor.profile_path && (
                    <img
                      src={imgPath + actor.profile_path}
                      alt={actor.name}
                      className="cast-image"
                    />
                  )}
                  <p className="actor-name">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
