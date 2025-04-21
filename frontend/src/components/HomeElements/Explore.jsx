import React, { useState, useEffect } from "react";
import { fetchTrendingNow, fetchNowPlaying, fetchTopRatedMovies, fetchTopRatedTv, fetchPopularTv, fetchTrendingMovies,fetchTrendingTv, fetchUpcomingMovies, fetchPopularMovies } from "../../services/tmdbApi.js";
import MovieRow from "../common/MovieRow.jsx";
import TrendingMovieRow from "../common/TrendingMovieRow.jsx";

function Explore() {
  const [trendingNow, setTrendingNow] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchTrendingNow().then(setTrendingNow);
        fetchTrendingMovies().then(setTrendingMovies);
        fetchNowPlaying().then(setNowPlaying);
        fetchTopRatedMovies().then(setTopRatedMovies);
        fetchTopRatedTv().then(setTopRatedTv);
        fetchPopularTv().then(setPopularTV);
        fetchTrendingTv().then(setTrendingTv);
        fetchUpcomingMovies().then(setUpcomingMovies);
        fetchPopularMovies().then(setPopularMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
      <section className="bg-[#32312f] pb-42" id="explore">
        <div className="container mx-auto px-3 md:px-10">
            <div className="py-32">
                <p className="font-[circular-web] text-lg text-[#fef8ec]">
                  Why stick to one genre
                </p>
                <p className="max-w-md font-[circular-web] text-blue-50 text-lg opacity-50">
                    See what other people are watching and saying about the movies and expand your taste in cinema
                </p>  
            </div>
            <MovieRow title="Trending Now" movies={trendingNow} />
            <MovieRow title="Top Rated TV" movies={topRatedTv} />
            <TrendingMovieRow movies={trendingMovies} title="Trending Movies" />
            <MovieRow title="Now Playing" movies={nowPlaying} />
            <MovieRow title="Top Rated Movies" movies={topRatedMovies} />
            <TrendingMovieRow movies={trendingTv} title="Trending TV Shows" />
            <MovieRow title="Popular TV" movies={popularTV} />
            <MovieRow title="Upcoming Movies" movies={upcomingMovies} />
            <MovieRow title="Popular Movies" movies={popularMovies} />
        </div>
      </section>   
  );
}

export default Explore;
