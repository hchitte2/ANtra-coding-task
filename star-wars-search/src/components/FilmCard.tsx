import type { FilmDisplay } from '../types'

interface Props {
  film: FilmDisplay
}

export function FilmCard({ film }: Props) {
  return (
    <div style={{
      background: '#16213e',
      border: '1px solid #f5c518',
      borderRadius: '8px',
      padding: '16px',
      margin: '12px 0',
      width: '350px'
    }}>
      <h3 style={{ color: '#f5c518' }}>{film.title}</h3>
      <p style={{ color: '#a0a0a0' }}>{film.year}</p>
    </div>
  )
}