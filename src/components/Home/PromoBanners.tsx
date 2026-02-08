import Link from 'next/link';
import styles from './home.module.css';

export default function PromoBanners() {
    return (
        <section className={styles.promoGrid}>
            <div className={styles.promoCard} style={{ background: 'white' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(89, 141, 102, 0.1)', color: '#598D66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                    <h3 className={styles.promoTitle} style={{ margin: 0 }}>Huge Sale</h3>
                </div>
                <div>
                    <div className={styles.promoDiscount} style={{ color: '#1D1E21' }}>70%</div>
                    <Link href="/medicine" className={styles.promoAction} style={{ color: '#8A8A89', fontSize: '0.9rem' }}>
                        Shop now
                    </Link>
                </div>
            </div>

            <div className={styles.promoCard} style={{ background: 'white' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(89, 141, 102, 0.1)', color: '#598D66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                    <h3 className={styles.promoTitle} style={{ margin: 0 }}>Secure delivery</h3>
                </div>
                <div>
                    <div className={styles.promoDiscount} style={{ fontSize: '3rem', color: '#1D1E21', marginBottom: '20px', fontWeight: 700 }}>
                        100%
                    </div>
                    <Link href="#" className={styles.promoAction} style={{ color: '#8A8A89', fontSize: '0.9rem' }}>
                        Read more
                    </Link>
                </div>
            </div>

            <div className={styles.promoCard} style={{ background: 'white' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(89, 141, 102, 0.1)', color: '#598D66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                    <h3 className={styles.promoTitle} style={{ margin: 0 }}>Off</h3>
                </div>
                <div>
                    <div className={styles.promoDiscount} style={{ color: '#1D1E21' }}>35%</div>
                    <Link href="/medicine" className={styles.promoAction} style={{ color: '#8A8A89', fontSize: '0.9rem' }}>
                        Shop now
                    </Link>
                </div>
            </div>
        </section>
    );
}
