import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import HeroImg from "../assets/hero-img.jpg";
import ProductCard from "../components/ProductCard";
import { HiArrowRight } from "react-icons/hi";
import axios from "../helpers/axios";

export default function Home({ newProducts }) {
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

      <section className="hero flex flex-col md:flex-row md:items-end bg-[#EDECE1] p-10">
        <div className="h-auto w-full md:order-2">
          <Image
            src={HeroImg}
            alt="hero"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="z-10 p-4">
          <h1 className="text-xl font-semibold">
            YEEZY BOOST 350 V2 ONYX AND BONE
          </h1>
          <Link href="/products">
            <button className="btn-black-outlined mt-4">FIND OUT MORE</button>
          </Link>
        </div>
      </section>

      <section className="newProducts p-4 md:p-10 bg-white">
        <div className="flex flex-wrap justify-between items-center pb-4">
          <span className="text-lg font-semibold">NEW ARRIVALS</span>
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
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("/products/latest-products");
  const newProducts = res.data;
  return {
    props: { newProducts },
  };
}
