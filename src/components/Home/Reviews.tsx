import styles from './home.module.css';

export default function Reviews() {
    return (
        <section className={styles.reviewsSection}>
            <div className={styles.storesHeader}>
                <h2 className={styles.storesTitle}>Reviews</h2>
                <p className={styles.storesSubtitle}>Search for Medicine, Filter by your location</p>
            </div>

            <div className={styles.storesGrid}>
                <div className={styles.reviewCard}>
                    <div className={styles.reviewImage} style={{ background: '#E3F2FD', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        MT
                    </div>
                    <span className={styles.reviewName}>Maria Tkachuk</span>
                    <p className={styles.reviewText}>
                        &quot;I recently used this medical platform to book an appointment with a specialist, and I was impressed by how easy and user-friendly the process was. Highly recommended!&quot;
                    </p>
                </div>
                <div className={styles.reviewCard}>
                    <div className={styles.reviewImage} style={{ background: '#F3E5F5', color: '#7B1FA2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        SR
                    </div>
                    <span className={styles.reviewName}>Sergey Rybachok</span>
                    <p className={styles.reviewText}>
                        &quot;I had a great experience using this medical platform to access my health records. The platform is a game-changer for managing my healthcare needs.&quot;
                    </p>
                </div>
                <div className={styles.reviewCard}>
                    <div className={styles.reviewImage} style={{ background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        NC
                    </div>
                    <span className={styles.reviewName}>Natalia Chatuk</span>
                    <p className={styles.reviewText}>
                        &quot;I recently had a virtual appointment with my doctor through this medical platform, and I was pleasantly surprised by how seamless the experience was.&quot;
                    </p>
                </div>
            </div>
        </section>
    );
}
