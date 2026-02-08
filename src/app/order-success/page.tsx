'use client';

import Link from 'next/link';
import { Button } from '@blueprintjs/core';

export default function OrderSuccessPage() {
    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#598D66' }}>Order Placed Successfully!</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px', maxWidth: '500px' }}>
                Thank you for your purchase. We have received your order and are processing it.
            </p>

            <Link href="/home" passHref legacyBehavior>
                <Button
                    large={true}
                    intent="success"
                    style={{ borderRadius: '30px', padding: '10px 40px' }}
                >
                    Continue Shopping
                </Button>
            </Link>
        </div>
    );
}
