import { useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import styles from './ProductCard.module.css';
import EllipsisText from 'react-ellipsis-text';
import { useCart } from '@/context/CartContext';
import { authService } from '@/services/auth.service';
import AuthModal from './AuthModal';

interface ProductCardProps {
    id: number;
    name: string;
    category: string;
    price: number;
    image?: string;
}

export default function ProductCard({ id, name, category, price, image }: ProductCardProps) {
    const [loading, setLoading] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        const user = authService.getCurrentUser();
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        try {
            setLoading(true);
            await addToCart(id);
            // Optional: You could use a toast here instead of alert for better UX
            // alert(`Added ${name} to cart!`); 
        } catch (error) {
            console.error('Failed to add to cart', error);
            alert('Failed to add item to cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={styles.card}>
                {/* Product Image */}
                <div className={styles.imageWrapper} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {image ? (
                        <img src={image} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div className={styles.placeholderImg}>💊</div>
                    )}
                </div>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.name}>{name}</h3>
                        <span className={styles.price}>৳{price}</span>
                    </div>

                    <div className={styles.category}>
                        <EllipsisText text={category} length={20} />
                    </div>

                    <div className={styles.actions}>
                        <Button
                            variant="primary"
                            size="small"
                            className={styles.addBtn}
                            onClick={handleAddToCart}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add to cart'}
                        </Button>
                        <Link href={`/product/${id}`} className={styles.detailsLink}>Details</Link>
                    </div>
                </div>
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
}
