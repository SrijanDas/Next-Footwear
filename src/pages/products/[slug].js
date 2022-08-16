import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader";
import BrandContainer from "../../components/products/BrandContainer";
import Colors from "../../components/products/Colors";
import Size from "../../components/products/Size";
import axios from "../../utils/axios";
import {
  HiShoppingCart,
  HiLightningBolt,
  HiCheckCircle,
  HiStar,
} from "react-icons/hi";
import ProductPageSkeleton from "../../components/skeletons/ProductPageSkeleton";
import AddToWishlist from "../../components/shared/AddToWishlist";
import ReviewsSection from "../../components/products/ReviewsSection";
import Rating from "../../components/shared/Rating";
import formatPrice from "../../utils/formatPrice";

const executeScroll = (ref) =>
  ref.current.scrollIntoView({ behavior: "smooth", block: "start" });

function ProductSlug(pageProps) {
  const router = useRouter();
  // if (!pageProps.product) {
  //   router.push("/500");
  //   return <Loader />;
  // }

  const pageTitle = `NFootwears | ${pageProps.product.name}`;

  const [product, setProduct] = useState(pageProps.product);
  const brand = product.brand;
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(
    pageProps.size ? pageProps.size : 0
  );
  // const [productSlug, setProductSlug] = useState(product.slug);
  const [imageUrl, setImageUrl] = useState(product.image_url);
  const otherImages = product.images;
  const [addedToCart, setAddedToCart] = useState(false);

  // this is product
  const [price, setPrice] = useState(
    pageProps.size
      ? product.available_products[String(pageProps.size)].price
      : "Please Select Size"
  );
  const [quantity, setQuantity] = useState(
    pageProps.size
      ? product.available_products[String(pageProps.size)].quantity
      : product.quantity
  );

  const [isLoading, setIsLoading] = useState(false);

  const btnsDisabled =
    selectedColor === "" ||
    selectedSize === 0 ||
    price === "This variant is not available";

  // handleColorChange
  const handleColorChange = async (color) => {
    setIsLoading(true);
    await axios
      .get(`/products/${product.parent_slug}?color=${color}`)
      .then((res) => {
        setPrice("Please Select Size");
        setSelectedSize(0);
        setProduct(res.data);
        setSelectedColor(color);
        setImageUrl(res.data.image_url);
      });
    setIsLoading(false);
  };

  // handleSizeChange
  const handleSizeChange = (size) => {
    setAddedToCart(false);
    setSelectedSize(size);
    setPrice(product.available_products[size].price);
    setQuantity(product.available_products[size].quantity);
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch({
      type: "ADDED_TO_CART",
      payload: {
        id: product.available_products[selectedSize].id,
        name: product.name,
        imageUrl,
        size: selectedSize,
        color: selectedColor,
        parentSlug: product.parent_slug,
        quantity: 1,
        price: parseInt(price),
      },
    });
    setAddedToCart(true);
    toast.success("Added to cart");
  };

  const buyNow = () => {
    addToCart();
    router.push("/cart");
  };

  // scrill to reviews
  const reviewSectionRef = useRef(null);

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
        <div className="h-auto p-5 lg:p-20 bg-white mb-10">
          <div className="flex flex-col lg:flex-row">
            <div className="leftSide flex flex-col items-center w-full lg:w-[40%]">
              <div className="flex w-full h-80 lg:h-[28rem]">
                {otherImages.length > 0 && (
                  <div className="flex flex-col gap-2 overflow-y-clip">
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

              {product.rating.rating > 0 ? (
                <div className="text-lg text-gray-500 antialiased mb-5 flex gap-2">
                  <Rating rating={product.rating.rating} />

                  <span>|</span>
                  <span
                    onClick={() => executeScroll(reviewSectionRef)}
                    className="link link-hover"
                  >
                    {product.rating.review_count === 1
                      ? `${product.rating.review_count} Review`
                      : `${product.rating.review_count} Reviews`}
                  </span>
                </div>
              ) : (
                <p className="text-sm font-bold text-gray-900 flex items-center">
                  <HiStar className="w-6 h-6 text-orange-400" />
                  Not rated yet
                </p>
              )}
              <h5 className="text-3xl font-medium antialiased text-red-900">
                {product.starting_price === -1
                  ? "Currently Unavailable"
                  : formatPrice(price, "INR")}
              </h5>
              {quantity < 10 && !btnsDisabled ? (
                <span className="font-medium h-5 antialiased text-error">
                  `Only {quantity} left in stock`
                </span>
              ) : (
                <div className="font-medium h-6 w-full antialiased text-error"></div>
              )}

              <Colors
                selectedColor={selectedColor}
                handleColorChange={handleColorChange}
                availableColors={product.available_colors}
              />
              {Object.keys(product.available_products).length !== 0 && (
                <Size
                  availableSizes={Object.keys(product.available_products)}
                  selectedSize={selectedSize}
                  handleSizeChange={handleSizeChange}
                />
              )}
            </div>
          </div>
          {product.rating.rating > 0 && (
            <div ref={reviewSectionRef}>
              <ReviewsSection
                productRating={product.rating}
                productId={product.id}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductSlug;

// This gets called on every request
export async function getServerSideProps(req, res) {
  // Fetch data from external API
  const { slug, color, size } = req.query;

  try {
    const serverRes = await axios.get(`/products/${slug}?color=${color}`);
    // Pass data to the page via props
    let props = { product: serverRes.data };
    if (size) {
      props.size = parseInt(size);
    }

    return { props };
  } catch (error) {
    return { props: { product: null } };
  }
}
