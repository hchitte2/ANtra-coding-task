import { useState } from 'react'
import type { FilmDisplay } from './types'
import { FilmCard } from './components/FilmCard'

// import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [films, setFilms] = useState<FilmDisplay[]>([])
  const [isloading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    setError(null)
    setFilms([])

    try {
      const response = await fetch(`https://swapi.info/api/people/?search=${searchTerm}`)
      const data = await response.json()

      if (data.length === 0) {
        setError('No characters found.')
        return
      }

      const character = data[0]

      const filmPromises = await Promise.all(
        character.films.map((filmUrl: string) =>
          fetch(filmUrl).then(res => res.json())
        )
      )

      const filmList: FilmDisplay[] = filmPromises.map((film) => ({
        title: film.title,
        year: film.release_date.split('-')[0]
      }))

      setFilms(filmList)
    } catch (err) {
      setError('An error occurred while fetching data.')
    } finally {
      setIsLoading(false)
    }
    // console.log('search triggered:', searchTerm)
  }
  return <div>
    <h1>Star Wars Film Finder</h1>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && handleSearch()}
      placeholder="Enter character name"
    />
    <button onClick={handleSearch}> Search </button>
    {isloading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div style={{ marginTop: '32px' }}>
      {films.map((film, index) => (
        <FilmCard key={index} film={film} />
      ))}
    </div>
  </div>
}

export default App
