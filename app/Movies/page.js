'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

const movies = [
    { id: 1, title: "Squid Game", rating: 8.0, image: "/path/to/squid-game.jpg", buttonText: "View" },
    { id: 2, title: "Nosferatu", rating: 7.7, image: "/path/to/nosferatu.jpg", buttonText: "View" },
    { id: 3, title: "Red One", rating: 6.4, image: "/path/to/red-one.jpg", buttonText: "View" },
    { id: 4, title: "Carry-On", rating: 6.5, image: "/path/to/carry-on.jpg", buttonText: "View" },
    { id: 5, title: "Superman", rating: "N/A", image: "/path/to/superman.jpg", buttonText: "View" },
];

const MovieCards = () => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Cinematics</h2>
            <div className="row">
                {movies.map((movie) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
                        <div className="card shadow">
                            <img
                                src={movie.image}
                                className="card-img-top"
                                alt={`${movie.title} poster`}
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">
                                    <span className="badge bg-warning text-dark">
                                        ⭐ {movie.rating}
                                    </span>
                                </p>
                                <button className="btn btn-primary w-100">
                                    {movie.buttonText}
                                </button>
                               
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCards;
