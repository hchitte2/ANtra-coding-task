import { useState, useEffect } from "react"
import type { Product, ProductsResponse } from './types'

function App() {
    const [searchTerm, setSearchTerm] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const totalPages = Math.ceil(total / 5)
    const skip = (currentPage - 1) * 5

    useEffect(() => {
        if (!searchTerm.trim()) return

        const fetchProducts = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    `https://dummyjson.com/products/search?q=${searchTerm}&limit=5&skip=${skip}`
                )
                const data: ProductsResponse = await res.json()
                setProducts(data.products)
                setTotal(data.total)
            } catch (err) {
                setError('Something went wrong.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [searchTerm, currentPage])

    return (
        <div>
            <h1>Product Search</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products..."
            />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.title}
                    </li>
                ))}
            </ul>
            <div>
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >First</button>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'active' : ''}
                    >{page}</button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >Next</button>
                <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >Last</button>
            </div>
        </div>
    )
}            // ← App() closes HERE after return

export default App