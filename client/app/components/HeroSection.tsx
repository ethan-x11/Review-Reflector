
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import img1 from '@/app/images/home/1.png'
import img2 from '@/app/images/home/2.png'
import img3 from '@/app/images/home/3.png'
import img4 from '@/app/images/home/4.png'
import Link from 'next/link'

const style = {
  main: "h-screen sm:h-full bg-hero md:bg-herobg bg-no-repeat bg-cover bg-center ",
  container: "py-32 flex flex-col md:flex-row items-center justify-between h-full px-16 sm:px-44 bg-white/80 md:bg-white/0",
  left: " md:w-1/2 flex flex-col items-center sm:items-start justify-center h-full",
  lefttext:'',
  heading: "text-[min(7.5vw,2.2rem)] font-bold mb-4 sm:mb-8 text-black",
  subheading: "text-[max(1.5vw,1rem)] font-medium mb-8 sm:mb-16 md:mb-32 text-black",
  button: "bg-yellow-400 text-red-500 font-medium text-[max(1vw,0.8rem)] py-2 sm:py-4 px-4 sm:px-8 rounded-full hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out",
  right: "flex items-center",
  image: "hidden md:block",
  // image: "mix-blend-multiply",
}

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    img1,
    img2,
    img3,
    img4
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const handleButtonClick = () => {
    const contactDiv = document.getElementById('contact')
    if (contactDiv) {
      window.scrollTo({
        top: contactDiv.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* <div className={style.bg} ></div> */}
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.lefttext}>
              <h1 className={style.heading}>Welcome to Educational Point</h1>
              <h2 className={style.subheading}>Empower Your Education Journey: Elevate Grades from Class 4 to 12 across All Boards along with B.Com, CA, CS and CMA! Explore Comprehensive Tuition Classes and Dive into the World of Computing with Programming, Database, Graphics Design, Tally, and More!</h2>
            </div>
            <button className={style.button} onClick={handleButtonClick}>Start Learning With Us</button>
          </div>
          <div className={style.right}>
            <Image src={images[currentImageIndex]} alt='EduPoint' width={500} height={500} className={style.image} style={{ transition: 'opacity 0.5s ease-in-out' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection