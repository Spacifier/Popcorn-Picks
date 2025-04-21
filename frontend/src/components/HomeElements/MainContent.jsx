import React, { useState, useEffect } from 'react';
import { Play, Star, Plus, ChevronRight } from 'lucide-react';

// Featured Section with carousel
const FeaturedCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const featuredContent = [
    {
      id: 1,
      title: "Dune: Part Two",
      image: "/api/placeholder/800/400",
      rating: 4.7,
      year: 2024,
      genre: "Sci-Fi",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family."
    },
    {
      id: 2,
      title: "The Penguin",
      image: "/api/placeholder/800/400",
      rating: 4.5,
      year: 2024,
      genre: "Crime Drama",
      description: "The rise of Oz Cobb in Gotham's criminal underworld following the events of The Batman."
    },
    {
      id: 3,
      title: "Deadpool & Wolverine",
      image: "/api/placeholder/800/400",
      rating: 4.6,
      year: 2024,
      genre: "Action/Comedy",
      description: "Wade Wilson teams up with Logan for a multiversal adventure."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredContent.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg my-8">
      {featuredContent.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
            <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
            <div className="flex items-center mb-2">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span className="mr-4">{item.rating}</span>
              <span className="mr-4">{item.year}</span>
              <span>{item.genre}</span>
            </div>
            <p className="mb-4 max-w-lg">{item.description}</p>
            <div className="flex gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center">
                <Play size={20} className="mr-2" /> Watch Trailer
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full flex items-center">
                <Plus size={20} className="mr-2" /> Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        {featuredContent.map((_, index) => (
          <button 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-red-600' : 'bg-white bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Category Row Component
const CategoryRow = ({ title, items }) => {
  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button className="text-gray-400 hover:text-white flex items-center">
          View All <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map(item => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden transition-transform duration-300 ease-in-out"
      style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold">{movie.title}</h3>
          <div className="flex items-center text-sm text-gray-300 mb-2">
            <Star className="text-yellow-400 mr-1" size={14} />
            <span className="mr-2">{movie.rating}</span>
            <span>{movie.year}</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
              <Play size={16} />
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}
      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold">{movie.title}</h3>
        </div>
      )}
    </div>
  );
};

// Main Page Content to add below hero section
const MainContent = () => {
  // Sample data for different categories
  const trendingMovies = [
    { id: 1, title: "Oppenheimer", image: "/api/placeholder/300/450", rating: 4.8, year: 2023 },
    { id: 2, title: "Barbie", image: "/api/placeholder/300/450", rating: 4.5, year: 2023 },
    { id: 3, title: "The Fall Guy", image: "/api/placeholder/300/450", rating: 4.2, year: 2024 },
    { id: 4, title: "Civil War", image: "/api/placeholder/300/450", rating: 4.3, year: 2024 },
    { id: 5, title: "Godzilla x Kong", image: "/api/placeholder/300/450", rating: 4.1, year: 2024 }
  ];
  
  const popularTVShows = [
    { id: 6, title: "The Last of Us", image: "/api/placeholder/300/450", rating: 4.9, year: 2023 },
    { id: 7, title: "Fallout", image: "/api/placeholder/300/450", rating: 4.6, year: 2024 },
    { id: 8, title: "Shogun", image: "/api/placeholder/300/450", rating: 4.8, year: 2024 },
    { id: 9, title: "House of the Dragon", image: "/api/placeholder/300/450", rating: 4.4, year: 2024 },
    { id: 10, title: "The Bear", image: "/api/placeholder/300/450", rating: 4.7, year: 2023 }
  ];
  
  const comingSoon = [
    { id: 11, title: "Gladiator II", image: "/api/placeholder/300/450", rating: 0, year: 2024 },
    { id: 12, title: "Joker: Folie à Deux", image: "/api/placeholder/300/450", rating: 0, year: 2024 },
    { id: 13, title: "Furiosa", image: "/api/placeholder/300/450", rating: 0, year: 2024 },
    { id: 14, title: "The Fantastic Four", image: "/api/placeholder/300/450", rating: 0, year: 2025 },
    { id: 15, title: "Mission: Impossible 8", image: "/api/placeholder/300/450", rating: 0, year: 2025 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <FeaturedCarousel />
      <CategoryRow title="Trending Movies" items={trendingMovies} />
      <CategoryRow title="Popular TV Shows" items={popularTVShows} />
      <CategoryRow title="Coming Soon" items={comingSoon} />
      
      {/* Genre Section */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-white mb-6">Browse by Genre</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary'].map(genre => (
            <div key={genre} className="relative h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
              <img src={`/api/placeholder/400/200`} alt={genre} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-xl font-bold text-white">{genre}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="my-12 bg-gray-800 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
          <p className="text-gray-400 mb-6">Get the latest on new releases, special features and more!</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-gray-700 text-white px-4 py-2 rounded-lg flex-grow"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;