import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import WatchlistButton from "../common/WatchlistButton";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { fetchTrailer } from "../../services/tmdbApi";

export const BentoTilt = ({ children, className="" }) => {
    const [transformStyle,setTransformStyle] = useState("");
    const itemRef= useRef(null);

    const handleMouseMove =(e) => {
        if(!itemRef.current) return;

        const {left, top, width, height} = itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) *8;
        const tiltY = (relativeX - 0.5) *-8;
        
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`;

        setTransformStyle(newTransform);
    }
    const handleMouseLeave = () =>{
        setTransformStyle("");
    };

    return(
        <div 
            ref={itemRef} 
            className={className} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};


const MovieCardTrending = ({ movie }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef(null);
    const expandTimer = useRef(null);
    const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  
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
    
        if (movie.id && isExpanded) {
          fetchTrailerData();
        }
      }, [isExpanded,movie.id, mediaType]);
  
    const handleMouseEnter = () => {
      expandTimer.current = setTimeout(() => setIsExpanded(true), 400);
    };
  
    const handleMouseLeave = () => {
      clearTimeout(expandTimer.current);
      setIsExpanded(false);
      setIsMuted(true);
      
      if (playerRef.current) {
        playerRef.current.mute();
      }
    };
  
    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
    const rating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : "N/A";
  
    return (
        <div
            className={`relative rounded overflow-hidden transition-all duration-300 h-[450px] ${isExpanded ? "w-152 z-30" : "w-73 z-10"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!isExpanded && (
                <div className="h-full">
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={title}
                            className="w-full h-[450px] object-cover"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <h3 className="text-white text-base font-medium line-clamp-1">{title}</h3>
                        <div className="flex items-center text-sm text-gray-300 mt-1">
                            <span>{year}</span>
                            {rating !== "N/A" && (
                                <span className="ml-2 bg-blue-800 px-1.5 py-0.5 rounded">{rating}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Expanded Card View */}
            {isExpanded && (
                <BentoTilt className="absolute inset-0 bg-black/90 text-white p-4 rounded flex flex-col justify-between">
                    <div className="relative top-0 h-90 rounded overflow-hidden">
                    <YouTube
                        videoId={trailerKey}
                        opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 1,
                            mute: isMuted ? 1 : 0,
                            controls: 0,
                            rel: 0,
                            showinfo: 0,
                        },
                        }}
                        onReady={(e) => (playerRef.current = e.target)}
                        className="rounded inset-0 w-full h-full"
                    />

                    {/* Title overlay on top of video */}
                    <div className="absolute bottom-0 left-0 w-full p-4">
                        <h3 className="text-4xl font-semibold max-w-100">
                        {title}
                        <span className="ml-2 text-sm text-blue-300 uppercase">
                            {movie.media_type || (movie.first_air_date ? "TV" : "Movie")}
                        </span>
                        </h3>
                    </div>

                    {/* Mute/Unmute Button */}
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        if (playerRef.current) {
                            isMuted ? playerRef.current.unMute() : playerRef.current.mute();
                            setIsMuted(!isMuted);
                        }
                        }}
                        className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
                    >
                        {isMuted ? <RxSpeakerOff size={18} /> : <RxSpeakerLoud size={18} />}
                    </button>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-center">
                            <p className="text-base text-gray-400">
                                <span className="mr-2">{year}</span>
                                <span className="bg-blue-800 text-sm px-2 py-2.5 rounded-full">{rating}</span>
                            </p>
                            <WatchlistButton movie={movie} buttonClass="ml-2"/>
                        </div>

                        {movie.overview && (
                            <p className="text-sm text-gray-400 line-clamp-3">{movie.overview}</p>
                        )}

                        {movie.genre_ids?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                            {movie.genre_ids.slice(0, 3).map((genreId) => (
                                <span
                                key={genreId}
                                className="text-sm bg-gray-800 px-2 py-0.5 rounded text-gray-300"
                                >
                                {genreId}
                                </span>
                            ))}
                            </div>
                        )}
                    </div>
                </BentoTilt>
            )}
        </div>
    );
  };
  
export default MovieCardTrending;