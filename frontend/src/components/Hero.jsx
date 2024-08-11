import React from 'react'
import { GiMedicines } from 'react-icons/gi'
import { FaBox } from 'react-icons/fa'
import { GiCardboardBoxClosed } from 'react-icons/gi'
import { MdOutlineArrowOutward } from 'react-icons/md'

const Hero = () => {
  return (
    <div className="relative bg-[#9FE870] min-h-[60vh] flex flex-col w-full rounded-3xl p-8 pb-0">
      <div className="w-fit leading-tight text-5xl md:text-[15vw] lg:text-[18vw] font-bold">
        Pharmacy.
      </div>

      <div className="uppercase text-sm sm:text-md  font-semibold">
        <p className="w-full sm:w-1/3">
          online medicine delivery is the process of ordering medication through
          a website or app and having them delivered to your doorstep.
        </p>
        <div className="w-full sm:hidden ">
          <img src="/hero1.png" className="h-[200px] mx-auto" />
        </div>
        <div className="text-sm flex my-8">
          <Feature1
            icon={GiCardboardBoxClosed}
            title="Delivery to your doorstep"
          />
          <Feature1 icon={GiMedicines} title="100% Genuine Medicines" />
        </div>
      </div>
      <div className="hidden sm:block absolute right-1/2 bottom-0 translate-x-1/2">
        <img src="/hero1.png" className="" />
      </div>
      <div>
        <button className=" group absolute bottom-5 right-5 rounded-full px-4 py-3 flex items-center">
          <h1 className="font-semibold group-hover:mx-3 duration-100 transition-all ease-in">
            See More
          </h1>
          <MdOutlineArrowOutward className="group-hover:scale-125 mx-2 w-8 h-8   flex items-center text-lg rounded-full p-1 text-[#9FE870] bg-[#083400]" />
        </button>
      </div>
    </div>
  )
}

function Feature1({ icon: Icon, title }) {
  return (
    <span className="flex flex-col sm:flex-row items-center gap-3">
      <span>
        <Icon className="w-10 h-10 flex items-center text-xl rounded-full p-1 text-[#9FE870] bg-[#083400]" />
      </span>
      <span className="w-[150px]  sm:text-sm">{title}</span>
    </span>
  )
}

export default Hero
