import { ProductType } from "@/types/Productype";
import Product from "./components/Product";
import Stripe from "stripe";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import InfoCard from "./components/InfoCard"; // Importando o novo componente InfoCard

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
        {/* Seção dos cartões de informação */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <InfoCard 
              icon="/card-icon.png" 
              title="PARCELAMENTOS" 
              description="Parcelamento em até 12x sem juros" 
            />
            <InfoCard 
              icon="/certificate-icon.png" 
              title="PRODUTOS ORIGINAIS" 
              description="Produtos originais com garantia e nota fiscal" 
            />
            <InfoCard 
              icon="/money-icon.png" 
              title="PREÇOS EXCLUSIVOS" 
              description="Preços exclusivos para sites e televendas" 
            />
          </div>
        </div>

        {/* Texto "DESTAQUES DA SEMANA" */}
        <div className="mt-16 flex justify-center items-center w-full">
          <div className="border-t border-gray-300 flex-grow mx-4"></div>
          <h2 className="text-2xl font-semibold text-center mx-4">DESTAQUES DA SEMANA</h2>
          <div className="border-t border-gray-300 flex-grow mx-4"></div>
        </div>

        <div className="mt-4 flex justify-center"> {/* Reduced top margin */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center"> {/* Ajustou colunas e aumentou o espaço */}
            {products.map((product) => (
              <Product key={product.id} product={product} className="w-52 mx-auto" />
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
