import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import BrandContainer from "../../components/BrandContainer";
import Colors from "../../components/Colors";
import Size from "../../components/Size";
import axios from "../../helpers/axios";

function ProductSlug(props) {
  const product = props.data;
  const brand = product.brand;

  const [price, setPrice] = useState("₹" + product.starting_price);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(0);

  // updating price when color or size is changed
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        let strArr = product.slug.split("-");
        strArr[strArr.length - 1] = selectedColor;
        strArr.push(selectedSize);
        const newSlug = strArr.join("-");
        const res = await axios.get(`/products/get-price/${newSlug}`);
        setPrice("₹" + res.data.price);
      } catch (error) {
        // console.log(error);
        if (selectedSize !== 0) {
          setPrice("This variant is not available");
          return;
        }
      }
    };
    if (selectedSize === 0) {
      setPrice("Please select size");
      return;
    }
    fetchPrice();
  }, [selectedColor, selectedSize]);

  return (
    <>
      <Head>
        <title>NFootwears | {product.name}</title>
        <meta
          name="description"
          content="We ship footwares directly from the brands to your doorsteps..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-auto p-5 flex flex-col lg:flex-row lg:p-20">
        <div className="leftSide w-full lg:w-[40%]">
          <div className="w-full h-[18rem] relative">
            <Image src={product.image_url} layout="fill" objectFit="contain" />
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn-green w-1/2">BUY NOW</button>
            <button className="btn-black rounded-md w-1/2">ADD TO CART</button>
          </div>
        </div>
        <div className="rightSide px-1 py-5 lg:w-[40%] lg:py-0 lg:px-10">
          <BrandContainer brand={brand} />
          <span className="text-lg font-medium antialiased mb-5">
            {product.name}
          </span>
          <br className="h-5 my5" />
          <h5 className="text-3xl font-medium antialiased text-red-900 dark:text-white mt-5">
            {product.starting_price === -1 ? "Currently Unavailable" : price}
          </h5>
          <Colors
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            availableColors={product.available_colors}
          />
          <Size selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>
      </div>
    </>
  );
}

export default ProductSlug;

// This gets called on every request
export async function getServerSideProps(req, res) {
  // Fetch data from external API
  const { slug } = req.query;

  try {
    const res = await axios.get(`/products/${slug}`);
    // Pass data to the page via props
    return { props: { data: res.data } };
  } catch (error) {
    console.log(error);
    return { props: { error: error } };
  }
}
