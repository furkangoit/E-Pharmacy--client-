import fs from 'fs';
import path from 'path';
import { Product } from '@/data/products';

export interface CartItem {
    product: Product;
    quantity: number;
}

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'cart.json');

const ensureDataFile = () => {
    if (!fs.existsSync(DATA_FILE)) {
        // Ensure directory exists
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
};

export const cartStore = {
    getCart: (): CartItem[] => {
        ensureDataFile();
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    },

    saveCart: (cart: CartItem[]) => {
        ensureDataFile();
        fs.writeFileSync(DATA_FILE, JSON.stringify(cart, null, 2));
    },

    clearCart: () => {
        ensureDataFile();
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
};
