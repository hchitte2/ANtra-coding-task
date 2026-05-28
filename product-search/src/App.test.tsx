import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: () => Promise.resolve({
      products: [
        { id: 1, title: 'iPhone' },
        { id: 2, title: 'Samsung' },
        { id: 3, title: 'Pixel' },
        { id: 4, title: 'Nokia' },
        { id: 5, title: 'Motorola' }
      ],
      total: 10
    })
  }))
})

describe('Product Search', () => {

  it('renders search input', () => {
    render(<App />)
    expect(
      screen.getByPlaceholderText('Search products...')
    ).toBeInTheDocument()
  })

  it('shows products after typing', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Search products...')
    await userEvent.type(input, 'phone')
    expect(await screen.findByText('iPhone')).toBeInTheDocument()
  })

  it('disables First and Prev on page 1', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Search products...')
    await userEvent.type(input, 'phone')
    await screen.findByText('iPhone')
    expect(screen.getByText('First')).toBeDisabled()
    expect(screen.getByText('Prev')).toBeDisabled()
  })

})