'use client';

import { Dialog, Classes, Button } from '@blueprintjs/core';
import Link from 'next/link';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Authentication Required"
            className={Classes.DARK} // Optional, based on design
            style={{ paddingBottom: '20px', background: 'white' }}
        >
            <div className={Classes.DIALOG_BODY}>
                <p style={{ marginBottom: '20px', fontSize: '1rem', color: '#1D1E21' }}>
                    You need to be logged in to add items to your cart. Please login or register to continue.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <Link href="/login" passHref legacyBehavior>
                        <Button intent="success" text="Login" style={{ borderRadius: '20px', padding: '5px 20px' }} onClick={onClose} />
                    </Link>
                    <Link href="/register" passHref legacyBehavior>
                        <Button intent="primary" text="Register" style={{ borderRadius: '20px', padding: '5px 20px' }} onClick={onClose} />
                    </Link>
                </div>
            </div>
        </Dialog>
    );
}
