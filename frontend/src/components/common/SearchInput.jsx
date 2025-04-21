import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

function SearchInput({ containerClass = "" }) {
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            navigate(`/search/${trimmed}`);
            setQuery("");
            setFocused(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`group flex items-center bg-violet-50 text-black rounded-full px-3 py-2 shadow-md overflow-hidden transition-all duration-500 ${focused || query ? 'w-72' : 'w-fit'} ${containerClass}`}
            onClick={() => inputRef.current.focus()}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => !query && setFocused(false)}
        >
            {!focused && !query && (
                <span className="ml-2 text-xs font-[general] uppercase transition-opacity duration-300"
                >
                    Popcorn Picks
                </span>
            )}
            <CiSearch className="min-w-5 min-h-5 text-black transition-transform duration-300 group-hover:scale-110" />
            <input
                ref={inputRef}
                type="text"
                placeholder="Search movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`bg-transparent outline-none ml-2 text-xs uppercase font-[general] placeholder:text-black placeholder:opacity-50 transition-all duration-400 ${focused || query ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}
            />
        </form>
    );
}

export default SearchInput;
