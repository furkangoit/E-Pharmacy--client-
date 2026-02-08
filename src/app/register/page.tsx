'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, InputGroup } from '@blueprintjs/core';
import styles from './register.module.css';
import { authService, RegisterString } from '../../services/auth.service';

export default function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: ''
        }
    });

    const onSubmit = async (data: RegisterString) => {
        try {
            await authService.register(data);
            router.push('/home');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className={styles.pageContainer}>
            {/* Logo in top left */}
            <div className={styles.logoContainer}>
                <img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
                <span>E-Pharmacy</span>
            </div>

            <div className={styles.contentWrapper}>
                {/* Left Side: Typography + Floating Image */}
                <div className={styles.leftSection}>
                    <h1 className={styles.heroTitle}>
                        Your medication,<br />
                        delivered
                        <span className={styles.heroSubtitle}> Say goodbye to all <span className={styles.highlightGreen}>your healthcare</span> worries with us</span>
                    </h1>

                    {/* Floating Pill Image */}
                    <img src="/register-hero.png" alt="Pill" className={styles.floatingImage} />
                </div>

                {/* Right Side: Form */}
                <div className={styles.rightSection}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formGrid}>
                            {/* Row 1: Name & Email */}
                            <div>
                                <InputGroup
                                    placeholder="User Name"
                                    className={styles.customInput}
                                    {...register('name', { required: 'Name is required' })}
                                    intent={errors.name ? 'danger' : 'none'}
                                />
                                {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name.message as string}</span>}
                            </div>

                            <div>
                                <InputGroup
                                    placeholder="Email address"
                                    type="email"
                                    className={styles.customInput}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    intent={errors.email ? 'danger' : 'none'}
                                />
                                {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message as string}</span>}
                            </div>

                            {/* Row 2: Phone & Password */}
                            <div>
                                <InputGroup
                                    placeholder="Phone number"
                                    type="tel"
                                    className={styles.customInput}
                                    {...register('phone', { required: 'Phone is required' })}
                                    intent={errors.phone ? 'danger' : 'none'}
                                />
                                {errors.phone && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.phone.message as string}</span>}
                            </div>

                            <div>
                                <InputGroup
                                    placeholder="Password"
                                    type="password"
                                    className={styles.customInput}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    intent={errors.password ? 'danger' : 'none'}
                                />
                                {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password.message as string}</span>}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            intent="success"
                            fill={true}
                            loading={isSubmitting}
                            className={styles.submitBtn}
                            style={{ background: '#598D66', border: 'none' }}
                        >
                            Register
                        </Button>

                        <div className={styles.footerText}>
                            Already have an account? <Link href="/login" style={{ color: '#8A8A89', textDecoration: 'none' }}>Login</Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Background Decorative Shape */}
            <div className={styles.bgShape} />
        </div>
    );
}
