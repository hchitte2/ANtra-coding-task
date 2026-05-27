import { useState, useEffect } from 'react'
import type { Beer } from './types'
import { BeerCard } from './components/BeerCard'
import { BeerModal } from './components/BeerModal'

function App() {
  const [beers, setBeers] = useState<Beer[]>([])
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  const fetchBeers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('https://api.sampleapis.com/beers/ale')
      const data = await res.json()

      // only first 3
      setBeers(data.slice(0, 3))

    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  fetchBeers()
}, [])

  return (
  <div>
    <h1>Beer Menu</h1>
    <div className="cards-container">
      {beers.map(beer => (
        <BeerCard
          key={beer.id}
          beer={beer}
          onClick={setSelectedBeer}
        />
      ))}
    </div>
    <BeerModal
      beer={selectedBeer}
      onClose={() => setSelectedBeer(null)}
    />
  </div>

)

}

export default App