import { NextResponse } from 'next/server';
import { mockProducts } from '@/data/products';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = mockProducts;

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return NextResponse.json({
        products: paginated,
        total,
        page,
        totalPages
    }, { status: 200 });
}
