import { useNavigate } from 'react-router-dom';
import Hero from "./Hero.jsx";
import React, { useState } from "react";
import Explore from "./Explore.jsx";
import About from '../About.jsx';
import Genre from './Genre.jsx';

function Home(){
    const [query,setQuery]=useState("");
    const navigate=useNavigate();

    function handleSearch(e){
        e.preventDefault();
        const trimmed= query.trim();
        if(trimmed){
            navigate(`/search/${trimmed}`);
            setQuery("");
        }
    }

    return (
       <>
       <Hero />
       <About />
       <Explore />
       <Genre />
       </>
    );
}

export default Home