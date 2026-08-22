import React, { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {

    const navigate = useNavigate();

    const imgRef = useRef(null);
    const [color, setColor] = useState("#141414");

    useEffect(() => {
        const fac = new FastAverageColor();

        if (imgRef.current) {
            fac.getColorAsync(imgRef.current).then((result) => {
                setColor(result.hex);
            });
        }

        return () => fac.destroy();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Card */}
            <div className="group relative ml-10 mt-5 w-60 h-100 rounded overflow-hidden border border-white bg-black transition-all duration-500  hover:border-transparent">

                {/* Ambient Background */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                    style={{
                        background: `linear-gradient(to bottom, ${color}, #111)`
                    }}
                />

                {/* Card Content */}
                <div className="relative z-10 p-5">

                    {/* Poster */}
                    <div className="w-50 h-70 rounded-2xl overflow-hidden">
                        <img
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            ref={imgRef}
                            crossOrigin="anonymous"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="mt-3 rounded-xl bg-black/70 backdrop-blur-md p-2">
                        <h1
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="truncate text-xl font-semibold text-white transition-colors duration-300"
                            style={{
                                color: "white",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = color)
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "white")
                            }
                        >
                            {movie.title}
                        </h1>

                        <p className="text-sm text-gray-300">
                            ⭐ {movie.rating.toFixed(1)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;