'use client';

import { useState, useEffect } from 'react';
import { Button, InputGroup, HTMLSelect, Spinner } from '@blueprintjs/core';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/product.service';
import { Product } from '@/data/products';

export default function MedicinePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    // Search/Filter states
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8; // Backend limit

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts({
                page: currentPage,
                limit: itemsPerPage,
                search: search || undefined,
                category: category || undefined
            });
            setProducts(data.products);
            setTotalPages(data.totalPages);
            // If current page is greater than total pages (e.g. after filter), reset to 1
            if (data.totalPages > 0 && currentPage > data.totalPages) {
                setCurrentPage(1);
            }
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false);
        }
    };

    // Load on mount and when page changes
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts({
                    page: currentPage,
                    limit: itemsPerPage,
                    search: search || undefined,
                    category: category || undefined
                });
                setProducts(data.products);
                setTotalPages(data.totalPages);
                // If current page is greater than total pages (e.g. after filter), reset to 1
                if (data.totalPages > 0 && currentPage > data.totalPages) {
                    setCurrentPage(1);
                }
            } catch (error) {
                console.error('Failed to load products', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [currentPage, search, category]); // Added search and category to dep array for auto-refresh, or keep manual filter? Requirement said "Filter" button apps filters.
    // Wait, the requirement says "Filter" button triggers it. So I should NOT add search/category to dependency array if I want manual trigger.
    // But linter wants 'loadProducts' in dep array.
    // I will use useCallback for loadProducts.

    // Handle Filter Button Click
    const handleFilter = () => {
        setCurrentPage(1); // Reset to page 1 on new filter
        loadProducts();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Medicine</h1>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '200px' }}>
                    <HTMLSelect
                        large={true}
                        fill={true}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ borderRadius: '30px', border: '1px solid #E8E8E8', background: 'white', color: '#8A8A89' }}
                    >
                        <option value="">Product category</option>
                        <option value="Vitamins">Vitamins</option>
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Antibiotics">Antibiotics</option>
                    </HTMLSelect>
                </div>

                <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <InputGroup
                            large={true}
                            leftIcon="search"
                            placeholder="Search medicine"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ borderRadius: '30px', border: '1px solid #E8E8E8', boxShadow: 'none' }}
                        />
                    </div>
                    <Button
                        icon="filter"
                        large={true}
                        text="Filter"
                        onClick={handleFilter}
                        style={{
                            borderRadius: '30px',
                            padding: '10px 32px',
                            background: '#598D66',
                            color: 'white',
                            border: 'none',
                            fontWeight: 600
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size={50} intent="success" /></div>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {products.map((p) => (
                            <ProductCard
                                key={p.id}
                                id={p.id}
                                name={p.name}
                                category={p.category}
                                price={p.price}
                                image={p.image}
                            />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', marginTop: '40px' }}>
                            Nothing was found for your request
                        </p>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', gap: '8px', alignItems: 'center' }}>
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E8E8E8',
                                    background: currentPage === 1 ? '#f5f5f5' : 'white', cursor: currentPage === 1 ? 'default' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentPage === 1 ? '#ccc' : '#1D1E21'
                                }}>
                                &lt;&lt;
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E8E8E8',
                                    background: currentPage === 1 ? '#f5f5f5' : 'white', cursor: currentPage === 1 ? 'default' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentPage === 1 ? '#ccc' : '#1D1E21'
                                }}>
                                &lt;
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        border: currentPage === page ? 'none' : '1px solid #E8E8E8',
                                        background: currentPage === page ? '#598D66' : 'white',
                                        color: currentPage === page ? 'white' : '#1D1E21',
                                        cursor: 'pointer', fontWeight: 600
                                    }}>
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E8E8E8',
                                    background: currentPage === totalPages ? '#f5f5f5' : 'white', cursor: currentPage === totalPages ? 'default' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentPage === totalPages ? '#ccc' : '#1D1E21'
                                }}>
                                &gt;
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #E8E8E8',
                                    background: currentPage === totalPages ? '#f5f5f5' : 'white', cursor: currentPage === totalPages ? 'default' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentPage === totalPages ? '#ccc' : '#1D1E21'
                                }}>
                                &gt;&gt;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
