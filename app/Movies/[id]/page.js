"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const MovieDetails = () => {
  const { id } = useParams(); // Extract 'id' from the route
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // State to control the popup visibility
  const [editedMovie, setEditedMovie] = useState({
    name: "",
    producer: "",
    director: "",
    stars: "",
    music_director: "",
    rating: "",
    paragraph: "",
    date: "",
    hours: "",
    banner_image: ""
  });

  useEffect(() => {
    if (!id) return; // Wait until `id` is available

    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3005/movies/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
        setEditedMovie(data); // Initialize editedMovie with the fetched movie details
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3005/movies/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Movie deleted successfully!");
        // Redirect or update state after deletion if needed
      } else {
        throw new Error("Failed to delete the movie");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedMovie),
      });
      if (response.ok) {
        alert("Movie updated successfully!");
        setShowEditPopup(false); // Close the popup after successful update
        const updatedMovie = await response.json();
        setMovie(updatedMovie); // Update state with the new movie data
      } else {
        throw new Error("Failed to update the movie");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) {
    return <div className="container mt-5 text-danger">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="container mt-5">Loading movie details...</div>;
  }

  return (
    <div className="container mt-2">
      <h1>{movie.name}</h1>
      <img
        src={movie.banner_image}
        className="card-img-top"
        style={{ height: "450px" }}
      />
      <div className="mt-4">
      <p><span className="fw-bold">Movie Name:</span> {movie.name}</p>
<p><span className="fw-bold">Movie Producer:</span> {movie.producer}</p>
<p><span className="fw-bold">Movie Director:</span> {movie.director}</p>
<p><span className="fw-bold">Movie Stars:</span> {movie.stars}</p>
<p><span className="fw-bold">Music Director:</span> {movie.music_director}</p>
<p><span className="fw-bold">Release Date:</span> {movie.date}</p>
<p><span className="fw-bold">Duration:</span> {movie.hours}</p>
<p><span className="fw-bold">Rating: ⭐</span> {movie.rating}</p>
<p>{movie.paragraph}</p>

      </div>

      <div className="d-flex">
        <button onClick={() => setShowEditPopup(true)} className="btn btn-primary mr-3">
          <MdEdit /> Edit
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          <MdDelete /> Delete
        </button>
      </div>

      {/* Edit Popup */}
      {showEditPopup && (
        <div className="modal show" style={{ display: "block" }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Movie Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditPopup(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editedMovie.name}
                    onChange={handleEditChange}
                    placeholder="Movie Name"
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="producer"
                    value={editedMovie.producer}
                    onChange={handleEditChange}
                    placeholder="Producer"
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="director"
                    value={editedMovie.director}
                    onChange={handleEditChange}
                    placeholder="Director"
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="stars"
                    value={editedMovie.stars}
                    onChange={handleEditChange}
                    placeholder="Stars"
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="music_director"
                    value={editedMovie.music_director}
                    onChange={handleEditChange}
                    placeholder="Music Director"
                    required
                  />
                  <input
                    type="number"
                    className="form-control mt-2"
                    name="rating"
                    value={editedMovie.rating}
                    onChange={handleEditChange}
                    placeholder="Rating"
                    required
                  />
                  <textarea
                    className="form-control mt-2"
                    name="paragraph"
                    value={editedMovie.paragraph}
                    onChange={handleEditChange}
                    placeholder="Paragraph"
                    required
                  />
                  <input
                    type="date"
                    className="form-control mt-2"
                    name="date"
                    value={editedMovie.date}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="hours"
                    value={editedMovie.hours}
                    onChange={handleEditChange}
                    placeholder="Duration"
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="banner_image"
                    value={editedMovie.banner_image}
                    onChange={handleEditChange}
                    placeholder="Banner Image URL"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditPopup(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
