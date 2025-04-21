import React, { useEffect, useState } from "react";
import { fetchSearch } from '../services/tmdbApi';
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard/MovieCard.jsx";
import { FiSearch } from "react-icons/fi";

function Search() {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(query || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetchSearch(query)
                .then((data) => {
                    setMovies(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search/${encodeURIComponent(searchInput.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#303841] to-[#1a1e24] p-8">
            <div className="max-w-7xl mx-auto mt-20">
                {/* Search Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-6xl font-[zentry] text-white mb-4">
                        Discover Movies & Shows
                    </h1>
                    {query && (
                        <p className="mt-4 text-white/80 text-lg font-[circular-web]">
                            Showing results for: <span className="font-semibold text-[#d2a679]">"{query}"</span>
                        </p>
                    )}
                </div>

                {/* Results Section */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#d2a679] border-t-transparent"></div>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block p-8 bg-white/5 rounded-2xl">
                            <span className="text-6xl mb-4 inline-block">🎬</span>
                            <h2 className="text-2xl text-white mb-4">No results found</h2>
                            <p className="text-white/70 max-w-md mx-auto">
                                We couldn't find any matches for your search. Try different keywords or explore our recommendations.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                            {movies
                                .filter((movie) => movie.media_type !== "person")
                                .map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                        </div>
                        <div className="mt-8 text-center text-white/50 text-sm font-[general]">
                            Found {movies.length} results
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;