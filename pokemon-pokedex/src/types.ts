export interface PokemonEntry {
  name: string
  url: string
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface Pokemon {
  name: string
  sprites: {
    front_default: string
  }
  types: PokemonType[]
}

export interface PokedexResponse {
  pokemon_entries: PokemonEntry[]
}