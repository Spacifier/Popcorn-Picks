import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Hero(){
   const [currentIndex,setcurrentIndex] = useState(1);
   const [hasClicked,sethasClicked] = useState(false);
   const [isLoading,setisLoading] = useState(true);
   const [loadedVideos,setloadedVideos] = useState(0);

   const totalVideos=6;
   const nextVideoRef= useRef(null);
   const upcomingVideoIndex = (currentIndex%totalVideos)+1;
   const getVideoSrc = (index) => `videos/hero-${index}.mp4`; 
   
   const handleMiniVdClick=()=>{
      sethasClicked(true);
      setcurrentIndex(upcomingVideoIndex);
   }
   const handleVideoLoad =()=>{
      setloadedVideos((prev)=> prev+1);
   }
   useEffect(()=> {
      if(loadedVideos === 3){
         setisLoading(false);
      }
   }, [loadedVideos])

   //to animate the world changing video click
   useGSAP(()=>{
      if(hasClicked){
         gsap.set('#next-video', {visibility: 'visible'});
         gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: ()=> nextVideoRef.current.play(),
         });
         gsap.from('#current-video', {
               transformOrigin: 'center center',
               scale: 0,
               duration: 1.5,
               ease: 'power1.inOut'
         });
      }
   }, {dependencies: [currentIndex], revertOnUpdate: true});
   //to animate the video when we scroll
   useGSAP(()=>{
      gsap.set('#video-frame', {
         clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
         borderRadius: '0 0 40% 10%',
      });
      gsap.from('#video-frame', {
         clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
         borderRadius: '0 0 0 0',
         ease: 'power1.inOut',
         scrollTrigger:{
            trigger: '#video-frame',
            start: 'center center',
            end: 'bottom center',
            scrub: true,
         },
      });
   });

   return(
      <div className="relative h-dvh w-screen overflow-x-hidden">
         {isLoading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
               <div className="typing-indicator">
                  <div className="typing-circle"></div>
                  <div className="typing-circle"></div>
                  <div className="typing-circle"></div>
                  <div className="typing-shadow"></div>
                  <div className="typing-shadow"></div>
                  <div className="typing-shadow"></div>
               </div>
             </div>
         )}
         <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div>
               <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                  <div onClick={handleMiniVdClick} 
                  className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                  >
                     <video 
                        src={getVideoSrc(upcomingVideoIndex)} 
                        ref={nextVideoRef}
                        loop
                        muted
                        id="current-video"
                        className="size-64 origin-center scale-150 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                     />
                  </div>
               </div>
               <video 
                  src={getVideoSrc(currentIndex)}
                  ref={nextVideoRef}
                  loop
                  muted
                  id="next-video"
                  className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                  onLoadedData={handleVideoLoad}
               />
               <video 
                  src={getVideoSrc(currentIndex === totalVideos-1? 1: currentIndex)} 
                  autoPlay
                  loop
                  muted
                  className="absolute left-0 top-0 size-full object-cover object center"
                  onLoadedData={handleVideoLoad}
               />
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
               M<b>o</b>vies
            </h1>
            <div className="absolute left-0 top-0 z-40 size-full">
               <div className="mt-24 px-5 sm:px-10">
                  <h1 className="special-font hero-heading text-blue-100">
                     Series
                  </h1>
                  <p className="mb-5 max-w-64 font-[robert-regular] text-blue-100">
                     Explore movies and TV shows<br />
                     Get recommendations and watch trailers
                  </p>
               </div>
            </div>
         </div>
         <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
            M<b>o</b>vies
         </h1>
      </div>
   );
}

export default Hero