import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Feature               | axios | fetch
// Simpler syntax        | ✅    | ❌ (more boilerplate)
// JSON parsing auto     | ✅    | ❌ (you must call .json())
// Timeout support       | ✅    | ❌ (needs extra code)
// Interceptors          | ✅ (for auth tokens) | ❌
// Better error handling | ✅    | ❌ (errors only for network issues)

export const fetchTrendingNow = async () => {
  const res = await axios.get(`${BASE_URL}/trending/all/week`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchTrendingTv = async () => {
  const res = await axios.get(`${BASE_URL}/trending/tv/week`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchNowPlaying = async () => {
  const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchUpcomingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchTopRatedMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchTopRatedTv = async () => {
  const res = await axios.get(`${BASE_URL}/tv/top_rated`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchPopularTv = async () => {
  const res = await axios.get(`${BASE_URL}/tv/popular`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const fetchSearch = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/multi`, {
    params: { 
      api_key: API_KEY,
      query: query,
     },
  });
  return res.data.results;
};


export const fetchMoviesByGenre = async (genreId) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: { 
      api_key: API_KEY,
      with_genres: genreId,
     },
  });
  return res.data.results;
};

export const fetchTrailer= async(movieId) => {
  const res= await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
    params:{api_key: API_KEY},
  });

  const trailers=res.data.results.filter(
    (video) => 
      video.site ==="YouTube" &&
      video.type === ("Trailer" || "Teaser")
    );
  
  return trailers.length>0? trailers[0].key : null;
};

export const fetchTrailerTv= async(movieId) => {
  const res= await axios.get(`${BASE_URL}/tv/${movieId}/videos`, {
    params:{api_key: API_KEY},
  });

  const trailers=res.data.results.filter(
    (video) => 
      video.site ==="YouTube" &&
      video.type === ("Trailer" || "Teaser")
    );
  
  return trailers.length>0? trailers[0].key : null;
};

