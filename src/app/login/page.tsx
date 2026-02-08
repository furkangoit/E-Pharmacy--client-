'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, InputGroup } from '@blueprintjs/core';
import styles from './login.module.css';
import { authService, LoginCredentials } from '../../services/auth.service';

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginCredentials) => {
        try {
            await authService.login(data);
            router.push('/home');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            alert(err.response?.data?.message || 'Login failed');
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
                        <div className={styles.formStack}>
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

                            <div>
                                <InputGroup
                                    placeholder="Password"
                                    type="password"
                                    className={styles.customInput}
                                    {...register('password', { required: 'Password is required' })}
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
                            Log In
                        </Button>

                        <div className={styles.footerText}>
                            Don't have an account? <Link href="/register" style={{ color: '#8A8A89', textDecoration: 'none' }}>Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
