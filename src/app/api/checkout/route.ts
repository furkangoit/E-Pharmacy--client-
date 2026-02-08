import { NextResponse } from 'next/server';
import { cartStore } from '@/lib/cartStore';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { paymentMethod, shippingDetails } = body;

        // Simulate processing usage
        console.log(`Processing ${paymentMethod} payment for`, shippingDetails);

        // Simulate network/processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const cart = cartStore.getCart();

        if (cart.length === 0) {
            return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
        }

        // Calculate total (for record keeping, though we don't save orders yet)
        const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        // Here we would integrate with a real payment gateway (Stripe, PayPal, etc.)
        // For now, we assume success if the cart is valid.

        // Clear the cart after successful order
        cartStore.clearCart();

        return NextResponse.json({
            success: true,
            message: 'Order placed successfully',
            orderId: `ORD-${Date.now()}`,
            total
        }, { status: 200 });

    } catch {
        return NextResponse.json({ message: 'Payment processing failed' }, { status: 500 });
    }
}
