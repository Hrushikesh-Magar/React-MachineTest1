import React, { useEffect, useState } from "react";
import "../App.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

import Card from "./Card";

const Main = () => {
  const [movieData, setMovieData] = useState([]);
  const [url, setUrl] = useState("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7b71ae6a31166f96347f9ed964916122");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const arr = ["Popular", "Top Rated", "Upcoming"];



  useEffect(() => {
    fetchData();
  }, [url, page]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}&page=${page}&query=${search}`);
      const data = await response.json();
      setMovieData(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (evt) => {
    if (evt.key === "Enter") {
      setSearch(evt.target.value);
      setPage(1);
      setUrl("https://api.themoviedb.org/3/search/movie?api_key=7b71ae6a31166f96347f9ed964916122");
    }
  };

  const handleCategory = (category) => {
    setSearch("");
    setPage(1);
    switch (category) {
      case "Popular":
        setUrl("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7b71ae6a31166f96347f9ed964916122");
        break;
      case "Top Rated":
        setUrl("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=7b71ae6a31166f96347f9ed964916122");
        break;
      case "Upcoming":
        setUrl("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=7b71ae6a31166f96347f9ed964916122");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
          <div className="container" id="Navbar">
            <a className="navbar-brand text-white" href="#">
              MovieDb
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                {arr.map((value, pos) => {
                  return (
                    <li>
                      <a
                        className="nav-link text-white"
                        href="#"
                        key={pos}
                        name={value}
                        onClick={() => {
                          handleCategory(value);
                        }}
                      >
                        {value}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Movie Name"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  onKeyPress={handleSearch}
                />
                <button  className="btn btn-secondary" onClick={handleSearch} type="search">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="container mt-5">
        {movieData.length === 0 ? (
          <p className="Not Found">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
        
      </div>
      
      <div className="pagination">
          <button className="pagination-btn" onClick={() => handlePagination(page - 1)}><GrFormPrevious />
</button>
          <button className="pagination-btn" onClick={() => handlePagination(page + 1)}><MdNavigateNext />
</button>
      </div>
    </div>
  );
};

export default Main;