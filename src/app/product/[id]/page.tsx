'use client';

import { useState, use, useEffect } from 'react';
import Button from '@/components/Button';
import { productService } from '@/services/product.service';
import { useCart } from '@/context/CartContext';
import { notFound } from 'next/navigation';
import { Spinner } from '@blueprintjs/core';
import { Product } from '@/data/products';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);
    const { addToCart } = useCart();

    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await productService.getProductById(Number(id));
                if (!data) {
                    setLoading(false); // will trigger not found check in render or redirect
                    return;
                }
                setProduct(data);
            } catch (error) {
                console.error('Failed to load product', error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => q > 1 ? q - 1 : 1);

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            setAddingToCart(true);
            await addToCart(product.id, quantity);
            alert(`Added ${quantity} x ${product.name} to cart!`);
        } catch (error) {
            console.error('Failed to add to cart', error);
            alert('Failed to add to cart.');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size={50} intent="success" /></div>;
    }

    if (!product) {
        notFound();
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
            {/* Product Overview */}
            <div style={{ display: 'flex', gap: '60px', marginBottom: '80px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{
                    flex: 1, minWidth: '350px', background: '#F7F8FA', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px',
                    padding: '40px'
                }}>
                    <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                </div>

                <div style={{ flex: 1, minWidth: '350px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    <div style={{ color: '#8A8A89', marginBottom: '8px', fontWeight: 500 }}>Brand: Generic</div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: 1.1, color: '#1D1E21' }}>{product.name}</h1>
                    <div style={{ fontSize: '1.25rem', color: '#666', marginBottom: '30px' }}>
                        {product.category}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ color: '#FFC107', fontSize: '1.2rem', display: 'flex', gap: '4px' }}>
                            <span>★</span><span>★</span><span>★</span><span>★</span><span style={{ color: '#E0E0E0' }}>★</span>
                        </div>
                        <span style={{ color: '#8A8A89', fontWeight: 500 }}>(120 reviews)</span>
                    </div>

                    <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '40px', color: '#1D1E21' }}>৳{product.price}</div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
                        <div style={{
                            border: '1px solid #E8E8E8', borderRadius: '30px', display: 'flex', overflow: 'hidden',
                            width: '140px', background: 'white'
                        }}>
                            <button onClick={decrement} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.5rem', color: '#598D66' }}>-</button>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>{quantity}</div>
                            <button onClick={increment} style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.5rem', color: '#598D66' }}>+</button>
                        </div>

                        <Button
                            variant="primary"
                            style={{ padding: '0 60px', fontSize: '1.1rem', height: 'auto' }}
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                        >
                            {addingToCart ? 'Adding...' : 'Add to cart'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs Container */}
            <div>
                <div style={{ borderBottom: '1px solid #eee', marginBottom: '40px', display: 'flex', gap: '40px' }}>
                    <button
                        style={{
                            padding: '10px 0', background: 'none', border: 'none',
                            borderBottom: activeTab === 'description' ? '3px solid #598D66' : '3px solid transparent',
                            fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer',
                            color: activeTab === 'description' ? '#1D1E21' : '#8A8A89'
                        }}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        style={{
                            padding: '10px 0', background: 'none', border: 'none',
                            borderBottom: activeTab === 'reviews' ? '3px solid #598D66' : '3px solid transparent',
                            fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer',
                            color: activeTab === 'reviews' ? '#1D1E21' : '#8A8A89'
                        }}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                </div>

                <div style={{ lineHeight: 1.8, color: '#666' }}>
                    {activeTab === 'description' ? (
                        <div>
                            <p>{product.name} is a premium product in the {product.category} category. It is essential for various health applications.</p>
                            <p><strong>Use:</strong> Take according to prescription or daily.</p>
                            <p><strong>Warning:</strong> Consult your healthcare provider before use.</p>
                        </div>
                    ) : (
                        <div>
                            {/* Mock Reviews */}
                            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
                                <div style={{ fontSize: '30px', margin: 0 }}>👤</div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Jane Cooper</div>
                                    <div style={{ color: '#FFC107', fontSize: '0.9rem', marginBottom: '8px' }}>★★★★★</div>
                                    <div style={{ color: '#8A8A89', fontSize: '0.9rem' }}>05/02/2026</div>
                                    <p style={{ marginTop: '10px' }}>Good product, fast delivery.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
