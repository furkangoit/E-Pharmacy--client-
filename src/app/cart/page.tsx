'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useCart } from '@/context/CartContext';
import { paymentService } from '@/services/payment.service';
import { Spinner } from '@blueprintjs/core';

export default function CartPage() {
    const router = useRouter();
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank'>('cash');

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            setIsProcessing(true);
            await paymentService.processPayment({
                paymentMethod,
                shippingDetails: {} // Add form data here in a real app
            });
            clearCart(); // Clear context state on success (API already clears backend)
            router.push('/order-success');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Checkout failed. Please try again.');
            setIsProcessing(false);
        }
    };

    if (!cartItems && !isProcessing) {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spinner size={50} intent="success" /></div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1.5, minWidth: '400px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Cart</h1>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Enter your shipping info</h2>
                    <p style={{ color: '#8A8A89', marginBottom: '30px', fontSize: '0.9rem' }}>
                        Enter your shipping info where you&apos;ll get the product. You can also send any other location where you need the products.
                    </p>

                    <div style={{ display: 'grid', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Input placeholder="Name" />
                            <Input placeholder="Email" />
                        </div>
                        <Input placeholder="Phone" />
                        <Input placeholder="Address" />
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Payment method</h2>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <label style={{
                            display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                            padding: '16px 24px', border: paymentMethod === 'cash' ? '2px solid #598D66' : '1px solid #E8E8E8',
                            borderRadius: '12px', background: paymentMethod === 'cash' ? '#F0F9F4' : 'white',
                            transition: 'all 0.2s', fontWeight: 500
                        }}>
                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                                style={{ accentColor: '#598D66' }}
                            />
                            Cash On Delivery
                        </label>
                        <label style={{
                            display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                            padding: '16px 24px', border: paymentMethod === 'bank' ? '2px solid #598D66' : '1px solid #E8E8E8',
                            borderRadius: '12px', background: paymentMethod === 'bank' ? '#F0F9F4' : 'white',
                            transition: 'all 0.2s', fontWeight: 500
                        }}>
                            <input
                                type="radio"
                                name="payment"
                                value="bank"
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                                style={{ accentColor: '#598D66' }}
                            />
                            Bank
                        </label>
                    </div>
                </section>
            </div>

            <div style={{ flex: 1, minWidth: '350px', background: '#F7F8FA', padding: '30px', borderRadius: '20px', height: 'fit-content' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Order details</h2>

                <div style={{ marginBottom: '30px', display: 'grid', gap: '20px' }}>
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} style={{ display: 'flex', gap: '15px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                                <div style={{
                                    width: '70px', height: '70px', background: 'white', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px',
                                    border: '1px solid #E8E8E8'
                                }}>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{item.product.name}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#8A8A89' }}>${item.product.price}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 700 }}>${(item.product.price * item.quantity).toFixed(2)}</div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <div style={{ border: '1px solid #E8E8E8', borderRadius: '15px', padding: '2px 10px', fontSize: '0.85rem', background: 'white', fontWeight: 600 }}>{item.quantity}</div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            style={{ border: 'none', background: 'none', color: '#FF4D4F', cursor: 'pointer', padding: 0, fontSize: '0.85rem', fontWeight: 500 }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontWeight: 700, fontSize: '1.25rem' }}>
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                </div>

                <Button
                    variant="primary"
                    size="large"
                    style={{ width: '100%', borderRadius: '30px' }}
                    disabled={cartItems.length === 0 || isProcessing}
                    onClick={handleCheckout}
                >
                    {isProcessing ? 'Processing...' : 'Place order'}
                </Button>
            </div>
        </div>
    );
}
