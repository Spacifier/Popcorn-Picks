import { useEffect, useState } from "react";

const WatchlistButton = ({ movie, onChange , buttonClass="" }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const exists = watchlist.some((item) => item.id === movie.id);
    setIsInWatchlist(exists);
  }, [movie.id]);

  const handleClick = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let updated;
    if (isInWatchlist) {
      updated = watchlist.filter((item) => item.id !== movie.id);
    } else {
      updated = [...watchlist, movie];
    }
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsInWatchlist(!isInWatchlist);
    if (onChange) onChange(updated);
  };

  return (
    <button
      title="Watchlist"
      onClick={handleClick}
      className={`text-xs px-3 py-2 rounded-full bg-gray-700 hover:bg-yellow-500 hover:text-black transition ${buttonClass}`}
    >
      {isInWatchlist ? "−" : "+"}
    </button>
  );
};

export default WatchlistButton;
