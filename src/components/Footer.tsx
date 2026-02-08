
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>+</span>
                    <span className={styles.logoText}>E-Pharmacy</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navItem}>Home</Link>
                    <Link href="/medicine-store" className={styles.navItem}>Medicine store</Link>
                    <Link href="/medicine" className={styles.navItem}>Medicine</Link>
                </nav>

                <div className={styles.socials}>
                    <a href="https://www.facebook.com/goITclub/" target="_blank" rel="noreferrer" aria-label="Facebook">
                        <svg className={styles.socialIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/goitclub/" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <svg className={styles.socialIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.825-.049.905-.039 1.354-.184 1.625-.29.412-.159.705-.357 1.011-.663.306-.306.504-.599.663-1.011.106-.271.251-.72.29-1.625.039-.908.049-1.228.049-3.825v-.08c0-2.627-.01-2.947-.049-3.825-.039-.905-.184-1.354-.29-1.625-.159-.412-.357-.705-.663-1.011-.306-.306-.599-.504-1.011-.663-.271-.106-.72-.251-1.625-.29-.908-.039-1.228-.049-3.825-.049z" />
                        </svg>
                    </a>
                    <a href="https://www.youtube.com/c/GoIT" target="_blank" rel="noreferrer" aria-label="YouTube">
                        <svg className={styles.socialIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>
                </div>
            </div>

            <div className={styles.info}>
                <p className={styles.desc}>
                    Get the medicine to help you feel better, get back to your active life, and enjoy every moment.
                </p>
            </div>

            <div className={styles.bottom}>
                <p>© E-Pharmacy 2023. All Rights Reserved</p>
                <div className={styles.links}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <span className={styles.separator}>|</span>
                    <Link href="/terms">Terms & Conditions</Link>
                </div>
            </div>
        </footer>
    );
}
