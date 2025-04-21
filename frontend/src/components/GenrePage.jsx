import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard/MovieCard.jsx";
import { fetchMoviesByGenre } from "../services/tmdbApi";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
];

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const genreName = genres.find((g) => g.id === Number(genreId))?.name || "Genre";

  const loadMovies = async (genreId, pageNum) => {
    setLoading(true);
    try {
      const data = await fetchMoviesByGenre(genreId, pageNum);
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error("Error loading genre movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset state on genre change
    setMovies([]);
    setPage(1);
    loadMovies(genreId, 1);
  }, [genreId]);

  useEffect(() => {
    if (page !== 1) {
      loadMovies(genreId, page);
    }
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#303841] to-[#1a1e24] p-8">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-[zentry] text-white mb-4">
            {genreName} Movies
          </h1>
        </div>

        {/* Spinner */}
        {loading && movies.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d2a679] border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="mt-8 text-center text-white/50 text-sm font-[general]">
              Found {movies.length} results
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
          </>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
