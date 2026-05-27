import type { Pokemon } from '../types'

interface Props {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: Props) {
  const type = pokemon.types[0].type.name  // grass, fire, or water

  return (
    <div className={`pokemon ${type}`}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <p>{pokemon.name}</p>
    </div>
  )
}