export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

// Matches user request: Antimonium, Isopro Alcohol, Dapsone, Helminthos
export const mockProducts: Product[] = [
    { id: 1, name: 'Clean Hand Sanitizer', category: 'Hygiene', price: 15, image: '/products/clean-hand-sanitizer.png' },
    { id: 2, name: 'Moringa Capsules', category: 'Herbal Supplements', price: 25, image: '/products/moringa.jpg' },
    { id: 3, name: 'Headache Relief', category: 'Pain Relief', price: 12, image: '/products/headache-relief.png' },
    { id: 4, name: 'Antibiotic 250mg', category: 'Pharmacy', price: 75, image: '/products/antibiotic.png' },
    { id: 5, name: 'Alcohol', category: 'Prefabricated Metal', price: 748, image: '/products/antimonium.jpg' }, // Fallback to existing
    { id: 6, name: 'Hydrochloride Capsules', category: 'Pharmacy', price: 58, image: '/products/hydrochloride_hq.png' },
    { id: 7, name: 'Hydrochloride', category: 'Framing (Wood)', price: 582, image: '/products/hydrochloride_hq.png' },
    { id: 8, name: 'Magnesium', category: 'Elfs', price: 354, image: '/products/magnesium.png' },
    { id: 9, name: 'Octinoxate', category: 'Elfs', price: 306, image: '/products/oxytocin_vial.png' },
    { id: 10, name: 'Prednisone', category: 'Soft Flooring and Base', price: 579, image: '/products/hand_sanitizer.png' },
    // Fill rest with generic
    ...Array.from({ length: 30 }).map((_, i) => ({
        id: i + 11,
        name: `Product ${i + 11}`,
        category: 'Pharmacy',
        price: 15.00 + i,
        image: '/products/herbal_supplement.png'
    }))
];
