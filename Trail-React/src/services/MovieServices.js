const BASE_URL = "http://localhost:8084/movies";

export async function getPopularMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/popular?page=${page}`)

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return response.json();
}

export async function getTopRated(page = 1) {
    const response = await fetch(`${BASE_URL}/top-rated?page=${page}`)

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return response.json();
}

export async function getUpcomingMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/upcoming?page=${page}`);

    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }

    return response.json();
}

export async function getNowPlayingMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/now_playing?page=${page}`);

    if (!response.ok) {
        throw new Error("Failed to fetch now playing movies");
    }

    return response.json();
}

export async function getMovieDetails(movieId) {
    const response = await fetch(`${BASE_URL}/details?movieId=${movieId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return response.json();
}


export async function searchMovies(query) {
    const response = await fetch(
        `http://localhost:8084/movies/search?query=${encodeURIComponent(query)}`
    );

    return response.json();
}
