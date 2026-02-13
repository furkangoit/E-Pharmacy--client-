import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, phone } = body;

        // Mock Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Simulate Database Insertion
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            phone
        };

        return NextResponse.json({
            message: 'User registered successfully',
            user: newUser,
            token: 'mock-jwt-token-' + Date.now()
        }, { status: 201 });

    } catch {
        return NextResponse.json(
            { message: 'Registration failed' },
            { status: 500 }
        );
    }
}
