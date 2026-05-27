import type { Beer } from '../types'

interface Props {
  beer: Beer
  onClick: (beer: Beer) => void
}

export function BeerCard({ beer, onClick }: Props) {
  return (
    <div
      className="beer-card"
      onClick={() => onClick(beer)}
    >
      <p>{beer.name}</p>
    </div>
  )
}