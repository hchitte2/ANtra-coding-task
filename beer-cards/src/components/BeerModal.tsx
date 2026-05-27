import { useEffect } from 'react'
import type { Beer } from '../types'

interface Props {
  beer: Beer | null
  onClose: () => void
}

export function BeerModal({ beer, onClose }: Props) {
  useEffect(() => {
    if (!beer) return

    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [beer])

  if (!beer) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{beer.name}</h2>
        <p>Price: {beer.price}</p>
        <p>Rating: {beer.rating.average}</p>
      </div>
    </div>
  )
}