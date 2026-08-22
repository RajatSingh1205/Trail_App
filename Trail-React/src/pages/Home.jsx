import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

import {
    getPopularMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    getTopRated,
} from "../services/MovieServices";

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [topRated, setTopRated] = useState([])

    useEffect(() => {

        async function loadMovies() {

            try {

                const popular = await getPopularMovies();
                const upcoming = await getUpcomingMovies();
                const nowPlaying = await getNowPlayingMovies();
                const topRated = await getTopRated();

                setPopularMovies(popular.movies);
                setUpcomingMovies(upcoming.movies);
                setNowPlayingMovies(nowPlaying.movies);
                setTopRated(topRated.movies);

            } catch (err) {
                console.log(err);
            }

        }

        loadMovies();

    }, []);

    return (
        <div className="bg-black min-h-screen">

            <Navbar />

            <main className="pt-16">

                <h1 className="pt-10 pl-10 text-white text-2xl font-bold">
                    Trending Movies
                </h1>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar  px-10 py-6">

                    {popularMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}

                </div>

                <h1 className="pt-10 pl-10 text-white text-2xl font-bold">
                    Top Rated
                </h1>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar px-10 py-6">

                    {topRated.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}

                </div>

                <h1 className="pt-10 pl-10 text-white text-2xl font-bold">
                    now playing
                </h1>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar px-10 py-6">

                    {nowPlayingMovies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}

                </div>

            </main>

        </div>
    );
};

export default Home;