
# 🎬 Movie Explorer

Welcome to **Popcorn Picks**, a stylish and dynamic movie web application built with React, featuring smooth animations, a personalized watchlist, dynamic genre filtering, and a powerful search experience.

---

## 👨‍💻 Developed by
**Swapnil Garg**

---

## 🌟 Features

- 🔍 **Search Movies** – Real-time search through TMDB.
- 🎞️ **Browse by Genre** – Genre-based exploration of curated movies.
- 📈 **Trending Section** – Discover trending movies dynamically.
- ❤️ **Watchlist** – Add/remove movies to your personal list.
- 🧠 **Smart Layouts** – Interactive and responsive UI with animations.
- ⚡ **Reusable Components** – Clean and modular structure for scalability.

---

## 🧩 Technologies Used
React.js (with Vite)

Tailwind CSS

TMDB API

Framer Motion (for animations)

React Router DOM

---


## 📂 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AnimatedTitle.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchInput.jsx
│   │   │   ├── MovieRow.jsx
│   │   │   ├── TrendingMovieRow.jsx
│   │   │   └── WatchlistButton.jsx
│   │   ├── HomeElements/
│   │   │   ├── Explore.jsx
│   │   │   ├── Genre.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Home.jsx
│   │   │   └── MainContent.jsx
│   │   └── MovieCard/
│   │       ├── MovieCard.jsx
│   │       ├── MovieCardHover.jsx
│   │       ├── MovieCardTrending.jsx
│   │       └── index.js
│   ├── services/
│   │   └── tmdbApi.js
│   ├── App.jsx
│   ├── Layout.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── About.jsx
│   ├── Search.jsx
│   ├── GenrePage.jsx
│   └── Watchlist.jsx
├── index.html
├── vite.config.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### 📦 Installation

```bash
git clone https://github.com/spacifier/popcorn-picks.git
cd frontend
npm install
```

### 🧪 Run Locally

```bash
npm run dev
```

---

## 🔗 API
This project uses [TMDB API](https://www.themoviedb.org/documentation/api) to fetch movie data.

---

## 📌 To Do (Future Features)
✅ Full movie detail page

✅ User login with Firebase

✅ Real-time synced watchlist

🌙 Dark/Light mode toggle

🧠 AI-based recommendations

---

## 🙌 Contributing
Feel free to fork, star, and contribute! PRs are welcome 🎉

---

## 📜 License
MIT
