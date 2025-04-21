import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { fetchTrailer,fetchTrailerTv } from "../../services/tmdbApi";
import WatchlistButton from "../common/WatchlistButton";
import { RxSpeakerLoud,RxSpeakerOff  } from "react-icons/rx";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const playerRef = useRef(null);
  const hoverTimeout = useRef(null);
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");


  const title = movie.title || movie.name;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const year = (movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  useEffect(() => {
    const fetchTrailerData = async () => {
      try {
        // Determine which API function to use based on media type
        const trailerFunc = mediaType === "tv" ? fetchTrailerTv : fetchTrailer;
        const key = await trailerFunc(movie.id);
        setTrailerKey(key);
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setTrailerKey(null);
      }
    };

    if (movie.id) {
      fetchTrailerData();
    }
  }, [movie.id, mediaType]);


  const handleHover = (hoverState) => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(hoverState);
      if (!hoverState && playerRef.current) {
        playerRef.current.pauseVideo();
      }
    }, hoverState ? 500 : 200);
  };

  return (
    <div
      className={`relative min-w-[160px] h-[220px] rounded overflow-hidden transition-all duration-300 ease-out ${
        isHovered ? "scale-140 min-w-[230px] z-50 shadow-2xl" : "scale-100 z-10"
      }`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Poster Image */}
      <img
        src={poster}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      {isHovered && (
          <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            {trailerKey ? (
              <div className="relative top-0 h-75 mb-4 rounded-lg overflow-hidden">
                <YouTube
                  videoId={trailerKey}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      mute: isMuted ? 1 : 0,
                      controls: 0,
                      modestbranding: 1,
                    },
                  }}
                  onReady={(e) => (playerRef.current = e.target)}
                  className="absolute inset-0 w-full h-full"
                />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-25 right-2 bg-white/50 p-1.5 rounded-full hover:bg-white/80"
                >
                  {isMuted ? <RxSpeakerOff className="text-xl" /> : <RxSpeakerLoud className="text-xl" />}
                </button>
                <WatchlistButton movie={movie} buttonClass="absolute bottom-25 left-2 bg-white/50 p-1.5 rounded-full hover:bg-white/80"/>
              </div>
            ) : (
              <div className="h-40 mb-4 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">No trailer available</span>
              </div>
            )}
          </div>
      )}
    </div>
  );
};

export default MovieCard;