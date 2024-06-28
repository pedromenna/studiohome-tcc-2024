import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function POST(req: NextRequest) {
    const { query } = await req.json();

    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-04-10',
        });

        const response = await stripe.products.list();

        if (!response.data) {
            throw new Error('Failed to fetch products from Stripe');
        }

        const filteredProducts = await Promise.all(
            response.data
                .filter((product) => {
                    const normalizedProductName = removeAccents(product.name.toLowerCase());
                    const normalizedQuery = removeAccents(query.toLowerCase());
                    return normalizedProductName.includes(normalizedQuery);
                })
                .map(async (product) => {
                    const priceResponse = await stripe.prices.list({
                        product: product.id,
                    });
                    const price = priceResponse.data[0];

                    return {
                        id: product.id,
                        name: product.name,
                        description: product.description || '',
                        image: product.images[0] || '',
                        price: price ? price.unit_amount || 0 : 0,
                        currency: price ? price.currency || 'usd' : 'usd',
                    };
                })
        );

        return NextResponse.json(filteredProducts, { status: 200 });
    } catch (error: any) {
        console.error('API handler error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
