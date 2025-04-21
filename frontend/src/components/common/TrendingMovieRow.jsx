import React, { useEffect, useRef } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import {MovieCardTrending} from "../MovieCard";

const TrendingMovieRow = ({ movies, title }) => {
    const rowRef = useRef();
  
    const scrollRow = (direction) => {
      const scrollAmount =  window.innerWidth / 2;
      if (direction === "left") {
        rowRef.current.scrollLeft -= scrollAmount;
      } else {
        rowRef.current.scrollLeft += scrollAmount;
      }
    };
  
    return (
      <div className="relative w-full">
        <h2 className="text-4xl font-[robert-medium] text-[#fbf2c8]">{title || "Trending Now"}</h2>
        <div className="relative group">
          <button
            onClick={() => scrollRow("left")}
            className="absolute left-0 top-[16px] z-20 bg-black/40 hover:bg-black/70 text-white px-4 py-53 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <SlArrowLeft size={20} />
          </button>
          <div
            ref={rowRef}
            className="flex overflow-x-auto flex-nowrap gap-6 scroll-smooth no-scrollbar pt-4"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 h-[500px]">
                <MovieCardTrending movie={movie} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRow("right")}
            className="absolute right-0 top-[16px] z-20 bg-black/40 hover:bg-black/70 text-white px-4 py-53 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <SlArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  export default TrendingMovieRow;