'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CartProvider } from '@/context/CartContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CartProvider>
                {children}
            </CartProvider>
        </LocalizationProvider>
    );
}
