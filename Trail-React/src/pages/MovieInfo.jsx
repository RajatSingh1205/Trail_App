import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/MovieServices.js";
import { FastAverageColor } from "fast-average-color";
import Credits from "../components/Credits.jsx";


function MovieInfo() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState("cast");

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const backdropRef = useRef(null);

    const imgRef = useRef(null);
    const [color, setColor] = useState("#141414");

    const handleImageLoad = async () => {
        const fac = new FastAverageColor();

        try {
            const result = await fac.getColorAsync(imgRef.current);
            setColor(result.hex);
        } finally {
            fac.destroy();
        }
    };

    const handleBackdropLoad = async () => {
        const fac = new FastAverageColor();

        try {
            const result = await fac.getColorAsync(backdropRef.current);

            console.log(result); // rgb, rgba, hex, isDark...

            setColor(result.hex);
        } catch (err) {
            console.error(err);
        } finally {
            fac.destroy();
        }
    };
    // useEffect(() => {
    //     if (!movie || !imgRef.current) return;
    //
    //     const fac = new FastAverageColor();
    //
    //     fac.getColorAsync(imgRef.current)
    //         .then((result) => {
    //             setColor(result.hex);
    //         })
    //         .catch((err) => console.error(err));
    //
    //     return () => fac.destroy();
    // }, [movie]);

    // const scrollRef = useRef(null);

    // useEffect(() => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollTop = 0;
    //     }
    // }, [activeTab]);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const data = await getMovieDetails(id);
                console.log(data); // Check your API response

                setMovie(data);
            } catch (err) {
                console.error("Error fetching movie:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchMovie();
    }, [id]);

    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
    //             Loading...
    //         </div>
    //     );
    // }

    if (loading) {
        return (
            <div className="min-h-screen bg-black animate-pulse text-white">
                <div className="w-screen h-16 bg-[#111]"></div>

                {/* Backdrop Skeleton */}
                <div className="h-[500px] w-full bg-[#181818]"></div>

                {/* Main Content Skeleton */}
                <div className="max-w-7xl mx-auto px-8 -mt-52 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Poster */}
                        <div className="w-72 h-[430px] rounded-2xl bg-[#202020] shadow-2xl"></div>

                        {/* Details */}
                        <div className="flex-1 pt-56 lg:pt-32 space-y-6">
                            <div className="h-12 w-2/3 rounded bg-[#202020]"></div>
                            <div className="h-6 w-1/3 rounded bg-[#202020]"></div>

                            <div className="h-10 w-32 rounded-full bg-[#202020]"></div>

                            <div className="space-y-3 mt-8">
                                <div className="h-5 w-full rounded bg-[#202020]"></div>
                                <div className="h-5 w-full rounded bg-[#202020]"></div>
                                <div className="h-5 w-5/6 rounded bg-[#202020]"></div>
                                <div className="h-5 w-4/6 rounded bg-[#202020]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Cast Skeleton */}
                    <div className="py-16">
                        <div className="h-10 w-40 rounded bg-[#202020] mb-8"></div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-[#181818] rounded-2xl p-5"
                                >
                                    <div className="w-28 h-28 mx-auto rounded-full bg-[#252525]"></div>
                                    <div className="h-5 w-20 mx-auto mt-4 rounded bg-[#252525]"></div>
                                    <div className="h-4 w-16 mx-auto mt-2 rounded bg-[#252525]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-2xl">
                Movie not found.
            </div>
        );
    }

    return (
        <>
            <div className="w-screen h-16 bg-black"
                 style={{
                     background: `linear-gradient(to bottom, ${color})`
                 }}
            ></div>

            <div
                className="min-h-screen bg-black text-white"
                className="min-h-screen text-white transition-all duration-700"
                style={{
                    background: `linear-gradient(to bottom, ${color}, #111)`
                }}
            >

                {/* Backdrop */}
                <div className="relative h-[550px] w-full overflow-hidden">
                    <img
                        ref={backdropRef}
                        crossOrigin="anonymous"
                        onLoad={handleBackdropLoad}
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdropPath}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />

                    {/*<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>*/}
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-8 -mt-52 relative z-10">

                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Poster */}
                        <div className="flex-shrink-0">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                alt={movie.title}
                                className="w-72 rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 pt-56 lg:pt-32">

                            <h1 className="text-5xl font-bold mb-2 transition-colors duration-300"

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

                            <p className="text-white text-lg mb-6 mt-10">
                                {movie.releaseDate} • {movie.genres?.join(" • ")}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-6  ">

                                <span className="px-4 py-1 rounded-full bg-gray-800 m">
                                    Rating {movie.rating?.toFixed(1)}
                                </span>

                            </div>

                            <h2 className="text-2xl font-semibold mb-3">
                                Synopsis
                            </h2>

                            <p className="text-gray-300 leading-8 text-lg">
                                {movie.overview}
                            </p>

                        </div>

                    </div>

                    {/* Credits */}
                    <Credits
                        cast={movie.cast}
                        crew={movie.crew}
                    />
                {/*    <div className="py-16">*/}

                {/*        <h2 className="text-4xl font-bold mb-5">*/}
                {/*            Credits*/}
                {/*        </h2>*/}
                {/*        <button*/}
                {/*            onClick={() => setActiveTab("cast")}*/}
                {/*            className={`px-6 py-3 rounded-full border transition-all duration-300 mr-4 mb-4 ${*/}
                {/*                activeTab === "cast"*/}
                {/*                    ? "bg-white text-black border-white"*/}
                {/*                    : "bg-white/10 text-white border-white hover:bg-white hover:text-black"*/}
                {/*            }`}*/}
                {/*        >*/}
                {/*            Cast*/}
                {/*        </button>*/}

                {/*        <button*/}
                {/*            onClick={() => setActiveTab("crew")}*/}
                {/*            className={`px-6 py-3 rounded-full border transition-all duration-300 ${*/}
                {/*                activeTab === "crew"*/}
                {/*                    ? "bg-white text-black border-white"*/}
                {/*                    : "bg-white/10 text-white border-white hover:bg-white hover:text-black"*/}
                {/*            }`}*/}
                {/*        >*/}
                {/*            Crew*/}
                {/*        </button>*/}

                {/*        <div*/}
                {/*            key={activeTab}*/}
                {/*            ref={scrollRef}*/}
                {/*            className="h-[540px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">*/}
                {/*            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">*/}
                {/*                {activeTab === "cast"*/}
                {/*                    ? movie.cast?.map((actor) => (*/}
                {/*                        <div*/}
                {/*                            key={`${actor.name}-${actor.character}`}*/}
                {/*                            className="bg-[#181818] rounded-2xl p-5 flex flex-col items-center border border-gray-800 hover:border-gray-500 hover:scale-105 transition-all duration-300"*/}
                {/*                        >*/}
                {/*                            <img*/}
                {/*                                src={*/}
                {/*                                    actor.profile_path*/}
                {/*                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`*/}
                {/*                                        : "https://placehold.co/185x185?text=No+Image"*/}
                {/*                                }*/}
                {/*                                alt={actor.name}*/}
                {/*                                className="w-28 h-28 rounded-full object-cover border-2 border-gray-700"*/}
                {/*                            />*/}

                {/*                            <h3 className="mt-4 text-lg font-semibold text-center">*/}
                {/*                                {actor.name}*/}
                {/*                            </h3>*/}

                {/*                            <p className="text-gray-400 text-sm text-center">*/}
                {/*                                {actor.character}*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                    ))*/}
                {/*                    : movie.crew?.map((person) => (*/}
                {/*                        <div*/}
                {/*                            key={`${person.name}-${person.job}`}*/}
                {/*                            className="bg-[#181818] rounded-2xl p-5 flex flex-col items-center border border-gray-800 hover:border-gray-500 hover:scale-105 transition-all duration-300"*/}
                {/*                        >*/}
                {/*                            <img*/}
                {/*                                src={*/}
                {/*                                    person.profile_path*/}
                {/*                                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`*/}
                {/*                                        : "https://placehold.co/185x185?text=No+Image"*/}
                {/*                                }*/}
                {/*                                alt={person.name}*/}
                {/*                                className="w-28 h-28 rounded-full object-cover border-2 border-gray-700"*/}
                {/*                            />*/}

                {/*                            <h3 className="mt-4 text-lg font-semibold text-center">*/}
                {/*                                {person.name}*/}
                {/*                            </h3>*/}

                {/*                            <p className="text-gray-400 text-sm text-center">*/}
                {/*                                {person.job}*/}
                {/*                            </p>*/}

                {/*                            <p className="text-xs text-gray-500 text-center mt-1">*/}
                {/*                                {person.department}*/}
                {/*                            </p>*/}
                {/*                        </div>*/}
                {/*                    ))}*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*/!*here *!/*/}
                </div>

            </div>
        </>
    );
}

export default MovieInfo;