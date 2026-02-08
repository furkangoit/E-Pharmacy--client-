import { NextResponse } from 'next/server';
import { mockProducts } from '@/data/products';

type Props = {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const { id } = params;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const product = mockProducts.find(p => p.id === Number(id));

    if (product) {
        return NextResponse.json(product, { status: 200 });
    } else {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
}
