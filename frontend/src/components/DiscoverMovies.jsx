import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard/MovieCard.jsx";
import { fetchDiscoverMovies } from "../services/tmdbApi";

const DiscoverMovie = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMovies = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetchDiscoverMovies(pageNum);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error("Failed to fetch discover movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d2f36] to-[#1a1e24] p-8">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-[zentry] text-white mb-4">
            Discover Movies
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-[#fbf2c8]/80 hover:bg-[#e2b985] text-black px-6 py-2 rounded font-semibold transition duration-200"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverMovie;
