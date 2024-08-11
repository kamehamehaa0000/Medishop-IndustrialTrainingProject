import React from 'react'
import { BsCart3 } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useAddToCart } from '../hooks/useCart'

const ProductCard = ({
  img = 'https://www.checkers.co.za/medias/10618226EA-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wxOTU4OTl8aW1hZ2UvcG5nfGltYWdlcy9oNjMvaDk3LzkwNTUwNjMyMTIwNjIucG5nfGYxNGNkY2IzMjcyYjkyYzg0YjgwYTI5ZmEwYmM2ZDBlYjllMDVhYjNjM2Y0ZDY5YThmYzFjYjQ2OWY4NzQ0ZmU',
  category = 'Syrup',
  title = 'Linctagon Cough Cyrup (50ml)',
  offer = 200,
  brand = 'cipla',
  originalPrice = '213000',
  discountedPrice = '20000',
  bgColor,
  _id,
}) => {
  const { mutate: addtoCart } = useAddToCart()
  const queryClient = useQueryClient()
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="overflow-hidden relative p-2 max-w-60 border rounded-lg shadow-lg text-center"
    >
      {' '}
      {offer ? (
        <span className="absolute top-0 left-0 bg-yellow-300 text-black text-xs font-bold py-1 px-2 ">
          {offer}% Off
        </span>
      ) : (
        ''
      )}
      <div className=" relative w-full ">
        <img
          src={img}
          alt={title}
          className="h-36 transition-all ease-in-out duration-500 hover:scale-125 mx-auto my-4 object-contain object-center"
        />{' '}
        <button
          onClick={() => {
            addtoCart(_id, 1)
          }}
          className=" absolute bottom-0 right-0 mx-1 font-semibold text-white py-2 px-2 text-sm bg-zinc-900 rounded-xl "
        >
          <BsCart3 className="text-lg inline" />{' '}
        </button>
      </div>
      <div className="rounde bg-[#FFFFFF] px-2 w-full">
        <div className="flex justify-between">
          <h3 className="text-gray-400 font-semibold text-sm">{brand}</h3>
        </div>
        <Link to={`/product/${_id}`}>
          <h2 className="text-left text-zinc-800 text-sm font-semibold ">
            {title}
          </h2>
        </Link>
        <h3 className="text-sm text-left font-semibold my-1 ">{category}</h3>
        <div className=" text-base w-full text-left inline-block font-semibold text-gray-900">
          <span className="line-through font-light text-gray-500 text-sm">
            Rs. {originalPrice ? originalPrice : discountedPrice}
          </span>{' '}
          Rs. {discountedPrice}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
