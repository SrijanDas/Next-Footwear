import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BrandContainer from "../../components/products/BrandContainer";
import Colors from "../../components/products/Colors";
import Size from "../../components/products/Size";
import axios from "../../helpers/axios";

function ProductSlug(props) {
  const product = props.data;
  const pageTitle = `NFootwears | ${product.name}`;
  const brand = product.brand;
  const [price, setPrice] = useState("₹" + product.starting_price);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(0);
  const [productId, setProductId] = useState(product.id);
  const [imageUrl, setImageUrl] = useState(product.image_url);

  const btnsDisabled =
    selectedColor === "" ||
    selectedSize === 0 ||
    price === "This variant is not available";

  // updating image change
  useEffect(() => {
    let strArr = product.slug.split("-");
    strArr[strArr.length - 1] = selectedColor;
    const newSlug = strArr.join("-");

    axios.get(`/products/get-image-url/${newSlug}`).then((res) => {
      setImageUrl(res.data.image_url);
    });
  }, [selectedColor]);

  // updating price when color or size is changed
  useEffect(() => {
    const fetchProduct = async () => {
      console.log("called");
      try {
        let strArr = product.slug.split("-");
        strArr[strArr.length - 1] = selectedColor;
        strArr.push(selectedSize);
        const newSlug = strArr.join("-");
        const { data } = await axios.get(`/products/details/${newSlug}`);

        setPrice("₹" + data.price);
        setProductId(data.id);
        setImageUrl(data.image_url);
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
    fetchProduct();
  }, [selectedColor, selectedSize]);

  const dispatch = useDispatch();

  const addToCart = () => {
    console.log("added to card", productId);
    dispatch({
      type: "ADDED_TO_CART",
      payload: {
        id: productId,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        price: parseInt(price.replace("₹", "")),
      },
    });
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="We ship footwares directly from the brands to your doorsteps..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-auto p-5 flex flex-col lg:flex-row lg:p-20 bg-white">
        <div className="leftSide w-full lg:w-[40%]">
          <div className="w-full h-[18rem] relative">
            <Image src={imageUrl} layout="fill" objectFit="contain" />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-green w-1/2 outline-none border-none"
              disabled={btnsDisabled}
            >
              BUY NOW
            </button>
            <button
              onClick={addToCart}
              className="btn btn-black rounded-md w-1/2"
              disabled={btnsDisabled}
            >
              ADD TO CART
            </button>
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
