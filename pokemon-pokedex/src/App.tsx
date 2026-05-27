import { useState, useEffect } from 'react'
import type { Pokemon } from './types'
import { PokemonCard } from './components/PokemonCard'

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  const fetchPokemons = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Step 1: fetch kanto pokedex
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokedex/kanto'
      )
      const data = await res.json()

      // Step 2: take only first 20 entries
      const first20 = data.pokemon_entries.slice(0, 20)

      // Step 3: fetch each pokemon individually
      const pokemonResponses = await Promise.all(
        first20.map((entry: { pokemon_species: { name: string } }) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`)
            .then(r => r.json())
        )
      )

      // Step 4: filter grass, water, fire only
      const filtered = pokemonResponses.filter((pokemon: Pokemon) =>
        pokemon.types.some(t =>
          ['grass', 'water', 'fire'].includes(t.type.name)
        )
      )

      setPokemons(filtered)

    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  fetchPokemons()
}, [])  // empty array = run once on mount

  return (
  <div>
    <h1>Pokedex</h1>

    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}

    <div className="pokemon-grid">
     {pokemons.map((pokemon) => (
  <PokemonCard key={pokemon.name} pokemon={pokemon} />
))}
    </div>
  </div>
)
}

export default App