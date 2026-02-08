import PharmacyCard, { PharmacyCardProps } from '@/components/PharmacyCard';

const mockStores: PharmacyCardProps[] = [
    { id: '1', name: 'Huge Sale Pharmacy', address: 'Albenia 683, Seoul', phone: '+82 2-1234-5678', isOpen: true, rating: 4.5 },
    { id: '2', name: 'Tremblay and Schiller', address: 'Main St 123, Busan', phone: '+82 51-9876-5432', isOpen: true, rating: 5 },
    { id: '3', name: 'Fahey-Batz', address: 'Gangnam Dist, Seoul', phone: '+82 2-5555-5555', isOpen: false, rating: 3.8 },
    { id: '4', name: 'MediCare Plus', address: 'Mapo-gu, Seoul', phone: '+82 2-3333-4444', isOpen: true, rating: 4.2 },
    { id: '5', name: 'Green Cross', address: 'Incheon City', phone: '+82 32-7777-8888', isOpen: true, rating: 4.0 },
    { id: '6', name: 'Family Health', address: 'Jeju Island', phone: '+82 64-1111-2222', isOpen: false, rating: 3.5 },
];

export default function MedicineStorePage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#1D1E21' }}>Medicine store</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '30px'
            }}>
                {mockStores.map(store => (
                    <PharmacyCard key={store.id} {...store} />
                ))}
            </div>
        </div>
    );
}
