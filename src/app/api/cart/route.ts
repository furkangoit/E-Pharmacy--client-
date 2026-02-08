import { NextResponse } from 'next/server';
import { mockProducts } from '@/data/products';
import { cartStore } from '@/lib/cartStore';

export async function GET() {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const cartItems = cartStore.getCart();
    return NextResponse.json(cartItems, { status: 200 });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, quantity = 1 } = body;

        const product = mockProducts.find(p => p.id === Number(productId));

        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const cartItems = cartStore.getCart();
        const existingItem = cartItems.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                product,
                quantity
            });
        }

        cartStore.saveCart(cartItems);

        return NextResponse.json({ message: 'Item added to cart', cart: cartItems }, { status: 201 });

    } catch {
        return NextResponse.json({ message: 'Error adding to cart' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ message: 'Product ID required' }, { status: 400 });
        }

        let cartItems = cartStore.getCart();
        cartItems = cartItems.filter(item => item.product.id !== Number(productId));
        cartStore.saveCart(cartItems);

        return NextResponse.json({ message: 'Item removed', cart: cartItems }, { status: 200 });

    } catch {
        return NextResponse.json({ message: 'Error removing item' }, { status: 500 });
    }
}
