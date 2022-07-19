import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import BrandContainer from "../../components/products/BrandContainer";
import Colors from "../../components/products/Colors";
import Size from "../../components/products/Size";
import axios from "../../helpers/axios";
import { HiShoppingCart, HiLightningBolt, HiCheckCircle } from "react-icons/hi";

function ProductSlug({ product }) {
  const router = useRouter();
  if (!product) {
    router.push("/500");
    return <Loader />;
  }
  const pageTitle = `NFootwears | ${product.name}`;
  const brand = product.brand;
  const [price, setPrice] = useState("₹" + product.starting_price);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(0);
  const [productId, setProductId] = useState(product.id);
  const [imageUrl, setImageUrl] = useState(product.image_url);
  const [addedToCart, setAddedToCart] = useState(false);

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
    dispatch({
      type: "ADDED_TO_CART",
      payload: {
        id: productId,
        name: product.name,
        imageUrl,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        price: parseInt(price.replace("₹", "")),
      },
    });
    setAddedToCart(true);
    toast.success("Added to cart");
  };

  const buyNow = () => {
    addToCart();
    router.push("/cart");
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
            <Image
              alt="image"
              src={imageUrl}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="btn gap-2 btn-green w-1/2 outline-none border-none"
              disabled={btnsDisabled}
              onClick={buyNow}
            >
              <HiLightningBolt className="text-2xl" />
              BUY NOW
            </button>

            {addedToCart ? (
              <button className="btn gap-2 rounded-md w-1/2">
                <HiCheckCircle className="text-2xl" />
                Added to Cart
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="btn btn-black gap-2 rounded-md w-1/2"
                disabled={btnsDisabled}
              >
                <HiShoppingCart className="text-2xl" />
                ADD TO CART
              </button>
            )}
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
      <ToastContainer position="bottom-right" />
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
    return { props: { product: res.data } };
  } catch (error) {
    return { props: { product: null } };
  }
}
