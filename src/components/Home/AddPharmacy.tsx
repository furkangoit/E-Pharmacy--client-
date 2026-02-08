import Link from 'next/link';
import Button from '../Button';
import styles from './home.module.css';

export default function AddPharmacy() {
    return (
        <>
            <section className={styles.addPharmacySection}>
                <div className={styles.addPharmacyContent}>
                    <h2 className={styles.addPharmacyTitle}>Add the medicines you need online now</h2>
                    <p className={styles.addPharmacyDesc}>
                        Enjoy the convenience of having your prescriptions filled from home by connecting with your community pharmacy through our online platform.
                    </p>
                    <Link href="/medicine">
                        <Button
                            variant="primary"
                            style={{
                                background: 'transparent',
                                border: '1px solid white',
                                color: 'white',
                                borderRadius: '30px',
                                padding: '12px 32px'
                            }}
                        >
                            Buy medicine
                        </Button>
                    </Link>
                </div>
                <div className={styles.addPharmacyImage}>
                    <img
                        src="/products/add_pharmacy_bg.png"
                        alt="Add Pharmacy"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '20px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            </section>

            <div className={styles.addPharmacyFeatures}>
                <ul className={styles.featuresList}>
                    <li>
                        <span style={{ color: '#598D66', fontWeight: 'bold' }}>⚡</span> Take user orders form online
                    </li>
                    <li>
                        <span style={{ color: '#598D66', fontWeight: 'bold' }}>⚡</span> Create your shop profile
                    </li>
                    <li>
                        <span style={{ color: '#598D66', fontWeight: 'bold' }}>⚡</span> Manage your store
                    </li>
                    <li>
                        <span style={{ color: '#598D66', fontWeight: 'bold' }}>⚡</span> Get more orders
                    </li>
                    <li>
                        <span style={{ color: '#598D66', fontWeight: 'bold' }}>⚡</span> Storage shed
                    </li>
                </ul>
            </div>
        </>
    );
}
