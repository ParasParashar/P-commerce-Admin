'use client'

import Image from "next/image"

const Logo = () => {
  return (
    <div className="flex items-center gap3">

    <div className=" relative w-24 h-24 object-contain   ">
      <Image src='/logo/logo.png' fill alt="LOGO" className="object-contain"/>
    </div>
      <p className="text-blue-400 font-bolder font-serif text-xl">Admin</p>
    </div>
  )
}

export default Logo
