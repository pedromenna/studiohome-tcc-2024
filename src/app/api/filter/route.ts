import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function POST(req: NextRequest) {
    const { query, minPrice, maxPrice } = await req.json();

    console.log(`Received query: ${query}, minPrice: ${minPrice}, maxPrice: ${maxPrice}`);

    if (!query || minPrice === undefined || maxPrice === undefined) {
        return NextResponse.json({ error: 'Query, minPrice, and maxPrice are required' }, { status: 400 });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2024-04-10',
        });

        const response = await stripe.products.list();

        if (!response.data) {
            throw new Error('Failed to fetch products from Stripe');
        }

        // Convert minPrice and maxPrice to cents
        const minPriceInCents = minPrice * 100;
        const maxPriceInCents = maxPrice * 100;

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

                    const unitAmount = price ? price.unit_amount || 0 : 0;

                    console.log(`Product: ${product.name}, Price: ${unitAmount}, Currency: ${price ? price.currency : 'N/A'}`);

                    if (unitAmount >= minPriceInCents && unitAmount <= maxPriceInCents) {
                        return {
                            id: product.id,
                            name: product.name,
                            description: product.description || '',
                            image: product.images[0] || '',
                            price: unitAmount,
                            currency: price ? price.currency || 'usd' : 'usd',
                        };
                    }

                    return null;
                })
        );

        const filteredNonNullProducts = filteredProducts.filter(p => p !== null);
        console.log(`Filtered products: ${filteredNonNullProducts.length}`);

        return NextResponse.json(filteredNonNullProducts, { status: 200 });
    } catch (error: any) {
        console.error('API handler error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
