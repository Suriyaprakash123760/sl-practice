/* eslint-disable @next/next/no-img-element */
// Add this line at the top of your file
"use client";

import Link from "next/link";
// import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdMovieCreation } from "react-icons/md";
import { useState, useEffect } from "react";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3005/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="container mt-5">Loading movies...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-2">
      <h2 className="mb-4">Cinematics</h2>
     
      <div className="row mt-3">
        {movies.map((movie) => {
          console.log("Movie ID:", movie._id); // Log the movie ID inside the map function
          return (
            <div
              className="col-sm-6 col-md-4 col-lg-3 mb-4"
              key={movie._id }
            >
              <div className="card shadow">
                <img
                  src={movie.card_image}
                  className="card-img-top"
                  alt={`${movie.name} poster`}
                  style={{ height: "300px"}}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{movie.name}</h5>
                    <p className="text-end fw-bold mb-0">{movie.hours}</p>
                  </div>
                  <p className="card-text mt-2">
                    <span className="badge bg-warning text-dark">
                      ⭐ {movie.rating}
                    </span>
                  </p>
                  <Link href={`/Movies/${movie._id}`}>

                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                      <MdMovieCreation className="me-2" />
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCards;
