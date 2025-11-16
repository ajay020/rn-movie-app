export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
};

export const fetchTestData = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTczODY3OTRkMDQ5MTZlY2Q4Mzk5MTk5OTNkMTFlOCIsIm5iZiI6MTc2MzE5Nzc5Ny4zOTEsInN1YiI6IjY5MTg0MzY1NjRhMzJiMjE2MjRjOWYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-j-ZUW1lWfUrLSFpPQ0UueVy-enL3jclEM-3zqgiGRw'
        }
    };

    console.log("TEST DATA FETCHING......")

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log("TEST DATA", json))
        .catch(err => console.error("TEST ERROR", err));
}

export const fetchMovies = async ({
    query,
}: {
    query: string;
}): Promise<Movie[]> => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    console.log("Fetch movies response status:", response.status);

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
};

export const fetchMovieDetails = async (
    movieId: string
): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            {
                method: "GET",
                headers: TMDB_CONFIG.headers,
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};