import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "/api/tmdb";

// Feature               | axios | fetch
// Simpler syntax        | ✅    | ❌ (more boilerplate)
// JSON parsing auto     | ✅    | ❌ (you must call .json())
// Timeout support       | ✅    | ❌ (needs extra code)
// Interceptors          | ✅ (for auth tokens) | ❌
// Better error handling | ✅    | ❌ (errors only for network issues)
// tmdbApi.js (Frontend API file using Vercel proxy)

export const fetchTrendingNow = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "trending/all/week" },
  });
  return res.data.results;
};

export const fetchDiscoverMovies = async (page = 1) => {
  const res = await axios.get(BASE_URL, {
    params: { path: "discover/movie", page, include_adult: false },
  });
  return res.data;
};

export const fetchDiscoverTv = async (page = 1) => {
  const res = await axios.get(BASE_URL, {
    params: {
      path: "discover/tv",
      page,
      include_adult: false,
      "first_air_date.gte": "2016-01-01",
    },
  });
  return res.data;
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "trending/movie/week" },
  });
  return res.data.results;
};

export const fetchTrendingTv = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "trending/tv/week" },
  });
  return res.data.results;
};

export const fetchNowPlaying = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "movie/now_playing" },
  });
  return res.data.results;
};

export const fetchUpcomingMovies = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "movie/upcoming" },
  });
  return res.data.results;
};

export const fetchPopularMovies = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "movie/popular" },
  });
  return res.data.results;
};

export const fetchTopRatedMovies = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "movie/top_rated" },
  });
  return res.data.results;
};

export const fetchTopRatedTv = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "tv/top_rated" },
  });
  return res.data.results;
};

export const fetchPopularTv = async () => {
  const res = await axios.get(BASE_URL, {
    params: { path: "tv/popular" },
  });
  return res.data.results;
};

export const fetchSearch = async (query, page = 1) => {
  const res = await axios.get(BASE_URL, {
    params: { path: "search/multi", query, page },
  });
  return res.data;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const res = await axios.get(BASE_URL, {
    params: { path: "discover/movie", with_genres: genreId, page },
  });
  return res.data;
};

export const fetchTrailer = async (movieId) => {
  const res = await axios.get(BASE_URL, {
    params: { path: `movie/${movieId}/videos` },
  });
  const trailers = res.data.results.filter(
    (video) => video.site === "YouTube" && ["Trailer", "Teaser"].includes(video.type)
  );
  return trailers.length > 0 ? trailers[0].key : null;
};

export const fetchTrailerTv = async (tvId) => {
  const res = await axios.get(BASE_URL, {
    params: { path: `tv/${tvId}/videos` },
  });
  const trailers = res.data.results.filter(
    (video) => video.site === "YouTube" && ["Trailer", "Teaser"].includes(video.type)
  );
  return trailers.length > 0 ? trailers[0].key : null;
};
