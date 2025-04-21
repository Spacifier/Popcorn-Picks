import React, { useRef } from "react";
import { MovieCard } from "../MovieCard";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const MovieRow = ({ movies, title }) => {
  const rowRef = useRef();

  const scrollRow = (direction) => {
    const scrollAmount = window.innerWidth / 2;
    if (rowRef.current) {
      rowRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl absolute top-[15px] font-[robert-medium] text-[#fbf2c8]">
        {title}
      </h2>
      <div className="relative group">
      <div className="relative overflow-visible">
        <button
          onClick={() => scrollRow("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <SlArrowLeft className="text-2xl" />
        </button>

        <div
          ref={rowRef}
          className="flex overflow-x-auto no-scrollbar gap-4 py-13 snap-x snap-mandatory scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
        </div>

        <button
          onClick={() => scrollRow("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <SlArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default MovieRow;