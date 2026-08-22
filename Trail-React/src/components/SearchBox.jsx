import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import { searchMovies } from "../services/MovieServices";

const SearchBox = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const [hoveredId, setHoveredId] = useState(null);
    const [colors, setColors] = useState({});

    const fac = useRef(new FastAverageColor());

    useEffect(() => {
        if (!isOpen) {
            setQuery("");
            setResults([]);
            setHoveredId(null);
            return;
        }

        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const data = await searchMovies(query);
                setResults(data.results || []);
            } catch (err) {
                console.error(err);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query, isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex justify-center pt-24"
            onClick={onClose}
        >
            <div
                className="w-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar */}
                <div className="bg-black/90 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                        <Search className="text-gray-400" />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search movies..."
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                            autoFocus
                        />

                        <button onClick={onClose}>
                            <X className="text-white cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Results */}
                {query.trim() !== "" && (
                    <div className="mt-3 bg-black/90 rounded-xl border border-gray-700 max-h-96 overflow-y-auto no-scrollbar">
                        {results.length > 0 ? (
                            results.map((movie) => (
                                <div
                                    key={movie.id}
                                    onMouseEnter={() => setHoveredId(movie.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        backgroundColor:
                                            hoveredId === movie.id
                                                ? colors[movie.id] || "#27272a"
                                                : "transparent",
                                        transition: "background-color 250ms ease",
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer"
                                >
                                    <img
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                                : "https://placehold.co/80x120?text=No+Image"
                                        }
                                        alt={movie.title}
                                        className="w-12 rounded"
                                        crossOrigin="anonymous"
                                        onLoad={async (e) => {
                                            if (!colors[movie.id]) {
                                                try {
                                                    const color =
                                                        await fac.current.getColorAsync(
                                                            e.target
                                                        );

                                                    setColors((prev) => ({
                                                        ...prev,
                                                        [movie.id]: `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.35)`,
                                                    }));
                                                } catch (err) {
                                                    console.error(
                                                        "FastAverageColor:",
                                                        err
                                                    );
                                                }
                                            }
                                        }}
                                    />

                                    <div>
                                        <h3 className="text-white font-medium">
                                            {movie.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm">
                                            {movie.release_date || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-center text-gray-400">
                                No movies found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBox;