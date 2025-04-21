import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard/MovieCard.jsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./common/AnimatedTitle.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const loadWatchlist = () => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  useGSAP(() => {
    // Create the main animation timeline
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        id: 'clip-scroll'
      }
    });

    // Container animation
    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: 'auto', // ← Changed from 100vh
      borderRadius: 0,
    });

    // Create separate ScrollTrigger for title pinning
    ScrollTrigger.create({
      trigger: "#watchlist-title",
      start: "+=110 top",
      end: () => ScrollTrigger.getById("clip-scroll").end,
      pin: true,
      pinSpacing: false,
      id: 'title-pin'
    });
  });

  return (
    <div id="watchlist" className="min-h-screen w-screen bg-[#d2a679]">
      {/* Add ID to title container */}
      <div id="watchlist-title" className="relative mb-8 flex flex-col items-center gap-5 z-20">
        <AnimatedTitle 
          title="<b>M</b>y w<b>a</b>tchlist" 
          containerClass='mt-30 !text-[#fbf8f1] text-center' 
        />
        <div className="w-24 h-1 bg-[#fbf8f1]/50 rounded-full" />
      </div>

      {/* Clip Container */}
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image bg-gradient-to-br from-[#965838]/90 to-[#7a452c]/90 backdrop-blur-sm">
          <div className="px-4 py-30 min-h-screen text-white">
            {watchlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <span className="text-4xl">🍿</span>
                <p className="text-2xl font-light text-center">
                  Your cinematic journey awaits...
                  <br />
                  <a href="/" className="underline mt-2 inline-block hover:text-[#fbf8f1]/80">
                    Start adding movies
                  </a>
                </p>
              </div>
            ) : (
              <div className="movie-grid grid sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols7 gap-6 p-8 max-w-7xl mx-auto">
                {watchlist.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onWatchlistChange={loadWatchlist}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;