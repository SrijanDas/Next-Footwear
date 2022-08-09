import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader";
import BrandContainer from "../../components/products/BrandContainer";
import Colors from "../../components/products/Colors";
import Size from "../../components/products/Size";
import axios from "../../helpers/axios";
import { HiShoppingCart, HiLightningBolt, HiCheckCircle } from "react-icons/hi";
import ProductPageSkeleton from "../../components/skeletons/ProductPageSkeleton";
import AddToWishlist from "../../components/shared/AddToWishlist";

const availableSizes = [6, 7, 8, 9, 10];

function ProductSlug({ product }) {
  const router = useRouter();
  if (!product) {
    router.push("/500");
    return <Loader />;
  }

  const pageTitle = `NFootwears | ${product.name}`;
  const brand = product.brand;
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(0);
  const [productId, setProductId] = useState(product.id);
  // const [productSlug, setProductSlug] = useState(product.slug);
  const [imageUrl, setImageUrl] = useState(product.image_url);
  const [otherImages, setOtherImages] = useState(product.images);
  const [addedToCart, setAddedToCart] = useState(false);
  const [price, setPrice] = useState("₹" + product.starting_price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [isLoading, setIsLoading] = useState(false);

  const btnsDisabled =
    selectedColor === "" ||
    selectedSize === 0 ||
    price === "This variant is not available";

  // handleColorChange
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // handleSizeChange
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // updating price when color or size is changed
  useEffect(() => {
    setAddedToCart(false);

    const fetchProduct = async () => {
      setIsLoading(true);

      try {
        let strArr = product.slug.split("-");
        strArr[strArr.length - 1] = selectedColor;
        strArr.push(selectedSize);
        const newSlug = strArr.join("-");
        const { data } = await axios.get(`/products/details/${newSlug}`);

        setPrice("₹" + data.price);
        setProductId(data.id);
        setImageUrl(data.image_url);
        setQuantity(data.quantity);
      } catch (error) {
        // console.log(error);
        if (selectedSize !== 0) {
          setPrice("This variant is not available");
        }
      }
      setIsLoading(false);
    };
    if (selectedSize === 0) {
      setPrice("Please select size");
      return;
    }
    fetchProduct();
  }, [selectedColor, selectedSize]);

  // updating image change
  useEffect(() => {
    setAddedToCart(false);
    const fetchImage = async () => {
      setIsLoading(true);
      let strArr = product.slug.split("-");
      strArr[strArr.length - 1] = selectedColor;
      const newSlug = strArr.join("-");

      await axios.get(`/products/get-image-url/${newSlug}`).then((res) => {
        setImageUrl(res.data.image_url);
        setOtherImages(res.data.images);
      });

      setIsLoading(false);
    };
    fetchImage();
  }, [selectedColor]);

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
      {isLoading ? (
        <ProductPageSkeleton />
      ) : (
        <div className="h-auto p-5 flex flex-col lg:flex-row lg:p-20 bg-white">
          <div className="leftSide flex flex-col items-center w-full lg:w-[40%]">
            <div className="flex w-full h-80 lg:h-[28rem] gap-4">
              {otherImages.length > 0 && (
                <div className="flex flex-col gap-2">
                  {otherImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setImageUrl(image.image_url)}
                      className={`avatar cursor-pointer border-2 rounded flex flex-col justify-center ${
                        image.image_url === imageUrl && "border-indigo-500"
                      }`}
                    >
                      <div className="w-16 rounded">
                        <Image
                          layout="fill"
                          src={image.image_url}
                          alt="image"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div
                className="h-full w-full bg-white flex flex-col justify-between p-2 bg-cover bg-center"
                style={{
                  backgroundImage: ` url(
              ${imageUrl}
            )`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex justify-end">
                  <AddToWishlist product={product} />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 w-full">
              <button
                className="btn gap-2 btn-green w-1/2 outline-none border-none"
                onClick={() => {
                  if (btnsDisabled) {
                    toast.warning(price);
                    return;
                  }
                  buyNow();
                }}
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
                  onClick={() => {
                    if (btnsDisabled) {
                      toast.warning(price);
                      return;
                    }
                    addToCart();
                  }}
                  className="btn btn-black gap-2 rounded-md w-1/2"
                >
                  <HiShoppingCart className="text-2xl" />
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
          <div className="rightSide px-1 py-0 lg:w-[40%] lg:px-10">
            <BrandContainer brand={brand} />
            <span className="text-lg font-medium antialiased mb-5">
              {product.name}
            </span>
            <h5 className="text-3xl font-medium antialiased text-red-900">
              {product.starting_price === -1 ? "Currently Unavailable" : price}
            </h5>
            {quantity < 10 && !btnsDisabled && (
              <span className="font-medium antialiased text-error">
                Only {quantity} left in stock
              </span>
            )}
            <Colors
              selectedColor={selectedColor}
              handleColorChange={handleColorChange}
              availableColors={product.available_colors}
            />
            <Size
              availableSizes={availableSizes}
              selectedSize={selectedSize}
              handleSizeChange={handleSizeChange}
            />
          </div>
        </div>
      )}
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
