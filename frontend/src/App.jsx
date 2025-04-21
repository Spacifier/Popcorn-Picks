import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'
import Home from './components/HomeElements/Home.jsx'
import Watchlist from './components/Watchlist.jsx'
import Search from './components/Search.jsx'
import GenrePage from './components/GenrePage.jsx'


function App() {

  return (
    <main className='relative min-h-screen'>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/genre/:genreId' element={<GenrePage />} />
      </Route>
    </Routes>
    </main>
  )
}

export default App
