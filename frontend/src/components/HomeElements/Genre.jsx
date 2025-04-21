import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import {Link,NavLink} from 'react-router-dom'

gsap.registerPlugin(useGSAP, ScrollTrigger);
const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
];


function Genre() {
  const getImgSrc = (index) => `/img/${index}.jpeg`; 

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#genre",
        start: "top 20%", 
        end: "center center", 
        scrub: 1.5,
        markers: false
      }
    });

    // Image shrink animation
    clipAnimation.to(".genre-image", {
      width: "280px",
      height: "200px",
      borderRadius: "2%",
      duration:4,
      ease: "none"
    });
    clipAnimation.to(".genre-text", {
      scale:0.7,
      duration:5,
      ease: "none"
    },0);

    // Genre cards animation
    clipAnimation.to(".genre-card", {
      opacity: 1,
      scale: 1,
      x: (i) => {
        const angle = (i * 360) / genres.length;
        return Math.cos(angle * (Math.PI / 180)) * 490;
      },
      y: (i) => {
        const angle = (i * 360) / genres.length;
        return Math.sin(angle * (Math.PI / 180)) * 220;
      },
      stagger: 0.05,
      ease: "none",
      duration: 3
    }, 0);
  });

  return (
    <div id="genre-container" className="w-screen bg-[#32312f] min-h-screen py-20">
      <div id="genre" className="h-screen w-screen flex items-center justify-center relative">
        <div className="genre-image z-50 relative w-screen h-screen overflow-hidden flex items-center justify-center">
            <img
              src="img/genre1.webp"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute mt-25 genre-text text-white text-7xl font-[zentry] special-font">GE<b>n</b>RE</div>
        </div>
          
        {/* Cards container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-100vw h-100vh pointer-events-none">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="genre-card absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 pointer-events-auto overflow-hidden"
            >
              {/* Image container with relative positioning */}
              <div className="relative w-[140px] h-[200px] p-2">
                <Link key={genre.id} to={`/genre/${genre.id}`}>
                  <img 
                      src={getImgSrc(genre.name)} 
                      alt={genre.name} 
                      className="w-full h-full object-cover rounded-lg"
                  />
                </Link>
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white text-lg font-bold block text-center">
                    {genre.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Genre