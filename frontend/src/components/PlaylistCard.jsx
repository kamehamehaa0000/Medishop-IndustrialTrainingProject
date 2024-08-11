import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'

const PlaylistCard = ({
  name = 'Maternal Health & Comfort',
  image = '/bgrem.png',
  offer = 5,
  color = '#BB201E',
}) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`relative text-sm  w-full mx-auto max-w-[350px] col-span-1 min-h-[240px] px-2 pt-4  overflow-hidden rounded-xl `}
    >
      <div className="w-1/2 ">
        <h1 className="text-base sm:text-2xl md:text-3xl font-semibold ">
          {name}
        </h1>
        {/* <button className="  font-semibold border-b-2 border-black w-fit">
          Browse All.
        </button> */}
        <div className="my-5 text-base">
          <h3 className="font-bold text-3xl ">{offer}%</h3>
          <p className=" font-semibold leading-3">Cashback</p>
        </div>
      </div>
      <div className="w-1/2">
        <img
          className={`absolute bottom-0 right-0 w-1/2`}
          src={image}
          alt="title"
        />
      </div>
    </div>
  )
}

export default PlaylistCard
