import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./common/AnimatedTitle.jsx";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function About(){

    useGSAP(()=>{
        const clipAnimation=gsap.timeline({
            scrollTrigger:{
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        })

        clipAnimation.to('.mask-clip-path',{
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
        })
    })

    return (
       <div id="about" className="min-h-screen w-screen">
           <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <h2 className="text-sm font-[general] uppercase md:text-[10px]">
                    Welcome to Popcorn Picks
                </h2>
                <AnimatedTitle title="Disc<b>o</b>ver the Cinem<b>a</b> <br /> Bi<b>n</b>ge all night" containerClass='mt-5 !text-black text-center' />
                <div className="about-subtext">
                    <p>
                        Tired of finding peak cinema 
                    </p>
                    <p>
                        Explore all new trending and best handpicked suggestions
                    </p>
                </div>
           </div>
           <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img 
                    src="img/about.webp"
                    alt="Background"
                    className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
           </div>
       </div>
    );
}

export default About