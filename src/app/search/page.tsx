"use client"; // Marca este componente como um Client Component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductType } from "@/types/Productype";
import Product from '../components/Product';
import Footer from '../components/Footer';
import PriceFilter from '../components/PriceFilter';

// Componente de carregamento
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
);

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query) return;

        const fetchProducts = async () => {
            setLoading(true);
            setProducts([]); // Limpa os produtos existentes
            try {
                const response = await fetch('/api/search', { // Certifique-se de que a URL está correta
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]);

    const handleFilter = async (minPrice: number, maxPrice: number) => {
        if (!query) return;

        setLoading(true);
        setProducts([]); // Limpa os produtos existentes
        try {
            const response = await fetch('/api/filter', { // Nova rota para filtragem
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, minPrice, maxPrice }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch filtered products');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow items-start">
                <div className="max-w-7xl w-full flex px-4 xl:px-0 mt-32">
                    <div className="w-1/4 pr-8"> {/* Aumenta a margem à direita do filtro */}
                        <div className="fixed top-32 left-4 w-80"> {/* Filtro fixo no topo, próximo à borda esquerda */}
                            <PriceFilter onFilter={handleFilter} />
                        </div>
                    </div>
                    <div className="w-3/4 ml-12"> {/* Aumenta a margem à esquerda dos resultados */}
                        <h1 className="text-2xl font-bold mb-6">Resultado para: {query}</h1>
                        {error && <p>Error: {error}</p>}
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"> {/* Aumenta o gap entre os cartões */}
                                {products.map((product) => (
                                    <Product key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
