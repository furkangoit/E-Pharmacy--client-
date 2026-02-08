import styles from '@/components/Home/home.module.css';
import MainBanner from '@/components/Home/MainBanner';
import PromoBanners from '@/components/Home/PromoBanners';
import MedicineStores from '@/components/Home/MedicineStores';
import AddPharmacy from '@/components/Home/AddPharmacy';
import Reviews from '@/components/Home/Reviews';

export default function HomePage() {
    return (
        <div className={styles.section}>
            <MainBanner />
            <PromoBanners />
            <MedicineStores />
            <AddPharmacy />
            <Reviews />
        </div>
    );
}
