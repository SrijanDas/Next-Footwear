import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/shared/ProductCard";
import { HiArrowRight } from "react-icons/hi";
import axios from "../utils/axios";
import LoginSection from "../components/home/LoginSection";
import { useSelector } from "react-redux";
import HeroSection from "../components/home/HeroSection";

export default function Home({ newProducts }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Head>
        <title>NFootwear | Home</title>
        <meta
          name="description"
          content="We ship footwares directly from the brands to your doorsteps..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isAuthenticated && <LoginSection />}

      <HeroSection />
      <section className="newProducts md:p-10 bg-white">
        <div className="flex flex-wrap justify-between items-center px-2 py-4">
          <span className="text-lg font-semibold uppercase">NEW ARRIVALS</span>
          <Link href="/products">
            <button className="btn-black-outlined flex items-center gap-2">
              VIEW ALL
              <HiArrowRight />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {newProducts.length >= 0 &&
            newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      {/* <section className="trending p-4 md:p-10 bg-white">
        <div className="flex flex-wrap justify-between items-center pb-4">
          <span className="text-lg font-semibold uppercase">Trending</span>
          <Link href="/products">
            <button className="btn-black-outlined flex items-center gap-2">
              VIEW ALL
              <HiArrowRight />
            </button>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newProducts.length >= 0 &&
            newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      <section className="topRated p-4 md:p-10 bg-white">
        <div className="flex flex-wrap justify-between items-center pb-4">
          <span className="text-lg font-semibold uppercase">Top Rated</span>
          <Link href="/products">
            <button className="btn-black-outlined flex items-center gap-2">
              VIEW ALL
              <HiArrowRight />
            </button>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newProducts.length >= 0 &&
            newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section> */}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("/latest-products");
  const newProducts = res.data;
  return {
    props: { newProducts },
  };
}
