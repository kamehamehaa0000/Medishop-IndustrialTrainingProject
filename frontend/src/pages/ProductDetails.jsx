import React from 'react'
import { useProductById } from '../hooks/useProduct'
import { useParams } from 'react-router-dom'
import { useAddToCart, useCart, useRemoveFromCart } from '../hooks/useCart'

const ProductDetails = ({
  brand = 'Nicotex-cipla',
  name = 'Nicotex gums, 2mg, Mint Plus - tin, 40 gums',
  discription = `A friend to smokers in their tough journey of quitting smoking, Nicotex offers a range of products, which helps one quit smoking using the proven principle of Nicotine replacement therapy. Nicotex is built on the vision of making India smoking free and proud to be the No. 1 Doctor recommended brand in its category.`,
  price = '1100.00',
  discount = '50%',

  directions = 'As described by docter.',
  dosage = ' As prescribed by docter.',
  packOf = 1,
  img = 'https://www.cipla.com/sites/default/files/2020-08/New%20Project_1.png',
}) => {
  const [isLightbox, setLightbox] = React.useState(false)

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      setLightbox(!isLightbox)
    }
  }
  function handleClick() {
    setLightbox(!isLightbox)
  }
  const { data: cart } = useCart()
  const { mutate: addToCart } = useAddToCart()
  const { mutate: removeFromCart } = useRemoveFromCart()
  console.log(cart)
  const { productID } = useParams()
  const { data: product, isLoading, error } = useProductById(productID)
  const discountedPrice =
    product?.data?.price -
      (product?.data?.offerPercentage / 100) * product?.data?.price || '500'

  const quantity =
    cart?.data?.items?.filter((item) => {
      return item?.product?._id == product?.data?._id
    })[0]?.quantity || 0
  directions = product?.data?.directions?.toString().split('*')
  return (
    <div className="w-full  overflow-x-hidden ">
      <div className="flex items-center  gap-16  py-10 max-lg:flex-col max-sm:py-0 max-sm:px-0 mb-10 overflow-hidden">
        <div className="flex items-center justify-center w-1/2 max-lg:w-10/12 max-sm:h-3/4 max-sm:w-screen ">
          <img
            src={product?.data?.imageUrl}
            className="rounded-lg p-8 w-7/12 max-sm:w-screen max-sm:h-3/4 max-sm:rounded-none"
            onClick={handleClick}
            alt=""
          />
        </div>
        <div className="w-1/2 max-lg:w-4/5">
          <h1 className="text-5xl mt-4 mb-8 max-sm:text-3xl">
            {product?.data?.name}
          </h1>

          <div className="text-sm md:text-base my-2">
            <p className="">{product?.data?.description}</p>
            <p>
              <span className="font-semibold">Directions for usage - </span>
              {directions?.map((element) => (
                <li>{element}</li>
              ))}
            </p>
            <p>
              {' '}
              <span className="font-semibold">Dosage - </span>
              {dosage}
            </p>
            <br />
          </div>
          <div className="hover:bg-zinc-800 text-white flex items-center justify-center gap-4 bg-black w-52 py-3 rounded-lg max-sm:w-full">
            <span className="font-semibold">Pack of {packOf}</span>
          </div>
          <div className="flex flex-col items-start gap-4 mt-4 mb-5 max-sm:flex-row max-sm:justify-between max-sm:mb-7 max-sm:items-center">
            <div className="flex items-center gap-4">
              <span className="font-bold text-4xl">Rs. {discountedPrice}</span>
              <span className="text-orange bg-orange-400 py-1 px-2 rounded-sm">
                {product?.data?.offerPercentage} % off
              </span>
            </div>
            <p className="line-through font-bold">
              Rs. {product?.data?.price}{' '}
            </p>
          </div>

          <div className="flex items-center gap-5 max-lg:flex-col max-lg:items-start max-sm:clear-right">
            <div className="flex items-center justify-between p-3 bg-light-grayish-blue rounded-lg w-36 max-sm:w-full">
              <img
                src="/images/icon-minus.svg"
                alt=""
                className="cursor-pointer"
                width={18}
                onClick={() => removeFromCart(product?.data?._id)}
              />
              <div className="font-bold text-text-md">{quantity}</div>
              <img
                src="/images/icon-plus.svg"
                alt=""
                className="cursor-pointer"
                width={18}
                onClick={() => {
                  addToCart(product?.data?._id, 1)
                }}
              />
            </div>
            <button
              onClick={() => {
                addToCart(product?.data?._id, 1)
              }}
              className="hover:opacity-70 flex items-center justify-center gap-4 bg-zinc-900 w-60 py-3 rounded-lg max-sm:w-full"
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="white"
                />
              </svg>
              <span className="text-white font-bold">Add to cart</span>
            </button>
          </div>
        </div>
        <div
          onClick={handleOverlayClick}
          style={{ display: isLightbox ? 'flex' : 'none' }}
          className="flex flex-col items-center justify-center group-hover:block fixed inset-0 bg-black bg-opacity-50 max-sm:justify-start"
        >
          <div className="relative flex flex-col items-end m-4 justify-center">
            <svg
              className=" fill-white active:fill-orange cursor-pointer"
              width="15"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClick}
            >
              <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" />
            </svg>
            <img
              className="rounded-lg max-sm:mt-12 max-sm:h-2/3"
              src={product?.data?.imageUrl}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
