import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Mock Validation
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Mock Authentication Logic
        // In a real app, this would check a database
        if (password === 'password123') { // Simple check for demo
            return NextResponse.json({
                user: {
                    id: '1',
                    name: 'Demo User',
                    email: email,
                },
                token: 'mock-jwt-token-123456789'
            }, { status: 200 });
        } else {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
