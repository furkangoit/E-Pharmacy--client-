'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@blueprintjs/core';
import Button from './Button';
import styles from './Header.module.css';

import { useCart } from '@/context/CartContext';
import { authService } from '@/services/auth.service';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<{ name?: string } | null>(null);
    const { cartCount } = useCart();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Wrap in setTimeout to avoid 'setState synchronously' warning
        const timer = setTimeout(() => {
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
        }, 0);
        return () => clearTimeout(timer);
    }, [pathname]); // Check auth on route change

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        router.push('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Medicine store', path: '/medicine-store' },
        { name: 'Medicine', path: '/medicine' },
    ];

    const isHomePage = pathname === '/' || pathname === '/home';

    return (
        <>
            <header className={styles.header} style={isHomePage ? {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: 'transparent',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px 40px',
            } : {}}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo.png"
                        alt="E-Pharmacy"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ height: '40px', width: 'auto' }}
                    />
                </Link>

                {/* Desktop Nav - Unified Design */}
                <nav className={styles.nav} style={{
                    background: 'white',
                    padding: '4px',
                    borderRadius: '50px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    border: '1px solid #EAEAEA'
                }}>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                            style={{
                                color: pathname === item.path ? '#598D66' : '#8A8A89',
                                background: 'transparent',
                                border: pathname === item.path ? '1px solid #598D66' : '1px solid transparent',
                                fontWeight: 600,
                                padding: '8px 24px',
                                borderRadius: '50px'
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className={styles.actions}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Link href="/cart" style={{ position: 'relative', cursor: 'pointer' }}>
                                {/* Cart Icon */}
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(96, 208, 142, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#598D66' }}>
                                    <Icon icon="shopping-cart" size={18} />
                                </div>
                                {cartCount > 0 && (
                                    <div style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF4D4F', color: 'white', fontSize: '10px', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold' }}>{cartCount}</div>
                                )}
                            </Link>

                            {/* User Icon */}
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D1E21', fontWeight: 600 }}>
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                style={{
                                    borderRadius: '30px',
                                    borderColor: 'rgba(0,0,0,0.1)',
                                    color: '#8A8A89',
                                    padding: '8px 24px',
                                    fontWeight: 500
                                }}
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.authButtons}>
                            <Link href="/login">
                                <Button variant="outline" style={{ color: '#1D1E21', fontWeight: 600, border: 'none' }}>Log in</Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="primary" style={{ borderRadius: '30px', padding: '10px 32px' }}>Register</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Hamburger Icon */}
                <button className={styles.hamburger} onClick={toggleMenu}>
                    {isMenuOpen ? <Icon icon="cross" size={24} /> : <Icon icon="menu" size={24} />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileNav}>
                        {navItems.map(item => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={toggleMenu} // Close on click
                                className={`${styles.mobileNavItem} ${pathname === item.path ? styles.active : ''}`}
                                style={{
                                    background: pathname === item.path ? '#598D66' : 'white',
                                    color: pathname === item.path ? 'white' : '#8A8A89',
                                    border: pathname === item.path ? '2px solid white' : 'none'
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.mobileActions}>
                        <Link href="/register" onClick={toggleMenu}>
                            <Button variant="outline" style={{ borderColor: 'white', color: 'white', borderRadius: '30px', padding: '10px 32px' }}>
                                Register
                            </Button>
                        </Link>
                        <Link href="/login" onClick={toggleMenu} style={{ color: 'white', fontWeight: 500, textDecoration: 'underline' }}>
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
