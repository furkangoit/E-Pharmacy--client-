import Image from 'next/image';
import styles from './home.module.css';

export default function MainBanner() {
    return (
        <section className={styles.mainBanner} style={{ backgroundColor: '#598D66' }}>
            <div className={styles.bannerContent} style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <h1 className={styles.bannerTitle} style={{ color: 'white', fontSize: '4.5rem', marginBottom: '24px' }}>
                    Your medication<br />delivered
                </h1>
                <p className={styles.bannerSubtitle} style={{ color: 'white', opacity: 0.9, fontSize: '1.1rem' }}>
                    Say goodbye to all your healthcare worries with us
                </p>
            </div>

            {/* Centered Hero Image */}
            <div className={styles.bannerImage} style={{ marginTop: '40px', position: 'relative', width: '100%', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    src="/products/medicine_pills_3d.png"
                    alt="Healthcare Product"
                    fill
                    style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))'
                    }}
                />
            </div>
        </section>
    );
}
