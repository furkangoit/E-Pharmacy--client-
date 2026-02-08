'use client';

import { Button } from '@blueprintjs/core';
import styles from './PharmacyCard.module.css';

export interface PharmacyCardProps {
    id?: string; // Add id for keying if needed
    name: string;
    address: string;
    phone: string;
    rating: number;
    isOpen: boolean;
}

export default function PharmacyCard({ name, address, phone, rating, isOpen }: PharmacyCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.name}>{name}</h3>
            </div>

            <div className={styles.info}>
                <div className={styles.row}>
                    <span className={styles.icon}>📍</span>
                    <span className={styles.text}>{address}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.icon}>📞</span>
                    <span className={styles.text}>{phone}</span>
                </div>
            </div>

            <div className={styles.footer}>
                <Button
                    intent="success"
                    text="Visit Store"
                    style={{ borderRadius: '20px', fontWeight: 600, padding: '6px 16px' }}
                />

                <div className={styles.meta}>
                    <div className={styles.rating}>
                        <span style={{ color: '#FFC107' }}>★</span> {rating}
                    </div>
                    <div className={`${styles.status} ${isOpen ? styles.open : styles.closed}`}>
                        {isOpen ? 'OPEN' : 'CLOSE'}
                    </div>
                </div>
            </div>
        </div>
    );
}
