import { ProductType } from "@/types/Productype";
import Product from "./components/Product";
import Stripe from "stripe";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";

async function getProducts(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
  });

  const products = await stripe.products.list();
  const limitedProducts = products.data.slice(0, 5); // Limiting to 5 products

  const formattedProducts = await Promise.all(
    limitedProducts.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      }
    })
  );
  return formattedProducts;
}

export default async function Home() {
  const products = await getProducts();

  const images = [
    "primeiro.png",
    "segundo.png"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden">
      <div className="w-full">
        <Carousel images={images} />
      </div>

      <div className="container mx-auto px-4 xl:px-0 flex-grow">
        <div className="mt-16 flex justify-center"> {/* Reduced top margin */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center"> {/* Adjusted columns and increased gap, added justify-center */}
            {products.map((product) => (
              <Product key={product.id} product={product} className="w-44 mx-auto" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 w-full"> {/* Reduced top margin */}
        <Footer />
      </div>
    </div>
  );
}
