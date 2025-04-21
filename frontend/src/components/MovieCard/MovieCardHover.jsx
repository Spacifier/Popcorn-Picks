import React from "react";
import YouTube from "react-youtube";
import WatchlistButton from "../common/WatchlistButton";
import { RxSpeakerLoud,RxSpeakerOff  } from "react-icons/rx";

const MovieCardHover = ({
  movie,
  trailerKey,
  isMuted,
  setIsMuted,
  playerRef,
}) => {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  
  // Format vote average to one decimal place
  const rating = movie.vote_average 
    ? Math.round(movie.vote_average * 10) / 10 
    : "N/A";

  return (
    <div className="absolute inset-0 bg-black/90 text-white p-3 flex flex-col justify-between rounded z-10">
      <div className="relative w-full h-40">
        {trailerKey ? (
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
                rel: 0,
                showinfo: 0,
              },
            }}
            onReady={(e) => (playerRef.current = e.target)}
            className="rounded overflow-hidden"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded">
            <p className="text-gray-400 text-sm">No trailer available</p>
          </div>
        )}
        
        {trailerKey && (
          <button
            onClick={() => {
              if (playerRef.current) {
                isMuted ? playerRef.current.unMute() : playerRef.current.mute();
                setIsMuted(!isMuted);
              }
            }}
            className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black/80"
          >
            {isMuted ? <RxSpeakerOff />: <RxSpeakerLoud />}
          </button>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <h3 className="text-lg font-semibold line-clamp-1">
          {title}
          <span className="ml-2 text-sm text-blue-300 uppercase">
            {movie.media_type || (movie.first_air_date ? "TV" : "Movie")}
          </span>
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            <span className="mr-2">{year}</span>
            <span className="bg-blue-800 text-xs px-1 py-0.5 rounded">
              {rating}
            </span>
          </p>
          <WatchlistButton movie={movie} />
        </div>
        
        {movie.overview && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {movie.overview}
          </p>
        )}
        
        {movie.genre_ids && movie.genre_ids.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {movie.genre_ids.slice(0, 2).map((genreId) => (
              <span 
                key={genreId}
                className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-gray-300"
              >
                {genreId}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCardHover;