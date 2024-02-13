
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const style = {
  main: "h-screen sm:h-full bg-hero md:bg-herobg bg-no-repeat bg-cover bg-center ",
  container: "py-32 flex flex-col md:flex-row items-center justify-between h-full px-16 sm:px-44 bg-white/80 md:bg-white/0",
}

const HeroSection = () => {

  return (
    <>
      {/* <div className={style.bg} ></div> */}
      <div className={style.main}>
        <div className={style.container}>
          HeroSection
        </div>
      </div>
    </>
  )
}

export default HeroSection