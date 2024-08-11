import React from 'react'

const Footer = () => {
  return (
    <div className="w-full p-6 mt-4 bg-[#163300] rounded-2xl flex flex-col items-center justify-center">
      <div className="w-10/12 py-6 rounded-2xl justify-start  bg-white flex flex-wrap items-baseline sm:justify-evenly">
        <Footer1 />
        <Footer2 />
        <Footer3 />
        <Footer4 />
      </div>
      <div className="w-10/12 p-8 rounded-2xl my-4 bg-[#9FE870] items-center justify-center flex">
        <img
          src="/medishopLogo.png"
          className="p-2 hidden sm:inline-block w-1/3 xl:w-1/6 md:w-1/4"
          alt=""
        />
        <div className="w-fit text-[#163300] leading-tight text-5xl md:text-[10vw] lg:text-[11vw] font-bold">
          Medishop.
        </div>
      </div>
      <div className="flex w-10/12 justify-between items-center font-light text-sm text-[#9FE870]">
        <span>©2024 Medishop</span>
        <span>Design & Developed by Aayush Gupta and team.</span>
      </div>
    </div>
  )
}

export default Footer

function Footer1() {
  return (
    <div className="px-4 w-[120px] sm:w-fit">
      <h1 className="font-semibold text-xl  my-3">Company.</h1>
      <span className="block text-zinc-500 text-sm">What's new</span>
      <span className="block text-zinc-500 text-sm">About</span>
      <span className="block text-zinc-500 text-sm">Press</span>
      <span className="block text-zinc-500 text-sm">Social Good</span>
      <span className="block text-zinc-500 text-sm">Contact</span>
    </div>
  )
}

function Footer2() {
  return (
    <div className="px-4  w-[180px]  sm:w-fit">
      <h1 className="font-semibold text-xl  my-3 ">Community.</h1>
      <span className="block text-zinc-500 text-sm">
        Medicare for Bussiness
      </span>
      <span className="block text-zinc-500 text-sm">2022 Creator Report</span>
      <span className="block text-zinc-500 text-sm">Charities</span>
      <span className="block text-zinc-500 text-sm">
        Creator Profile Directory
      </span>
      <span className="block text-zinc-500 text-sm">Explore Templates</span>
    </div>
  )
}

function Footer3() {
  return (
    <div className="px-4   w-[120px]  sm:w-fit">
      <h1 className="font-semibold text-xl my-3 ">Support.</h1>
      <span className="block text-zinc-500 text-sm">Help Topics</span>
      <span className="block text-zinc-500 text-sm">Getting Started</span>
      <span className="block text-zinc-500 text-sm">Linktree Pro</span>
      <span className="block text-zinc-500 text-sm">Features & How-Tos</span>
      <span className="block text-zinc-500 text-sm">FAQs</span>
      <span className="block text-zinc-500 text-sm">Report a violation</span>
    </div>
  )
}

function Footer4() {
  return (
    <div className="px-4   w-[180px]  sm:w-fit">
      <h1 className="font-semibold text-xl my-3 ">Trust & Legal.</h1>
      <span className="block text-zinc-500 text-sm">Terms & Conditions</span>
      <span className="block text-zinc-500 text-sm">Privacy Notice</span>
      <span className="block text-zinc-500 text-sm">Cookie Notice</span>
      <span className="block text-zinc-500 text-sm">Trust Center</span>
      <span className="block text-zinc-500 text-sm">Cookie Preferences</span>
    </div>
  )
}
