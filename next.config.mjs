/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['files.stripe.com'],
    },
    env: {
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
};

export default nextConfig;
