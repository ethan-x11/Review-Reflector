import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const style = {
  main: "bg-gradient-to-r from-[#09a178] via-[#069786] to-[#038c95] ",
  container: "flex flex-col justify-start items-center h-full pt-64 pb-8 gap-y-8",
  heading: "dark:text-white text-black text-5xl font-bold",
  para: "dark:text-white text-blacktext-2xl font-semibold",
};

const HeroSection = () => {
  return (
    <>
      {/* <div className={style.bg} ></div> */}
      <div className={style.main}>
        <div className={style.container}>
          <h2 className={style.heading}>Sentiment Analysis Checker</h2>
          <p className={style.para}>
            Use sentiment analysis to quickly detect feelings and pain points.
          </p>
          <button><Link href='/#gourav'>Meow</Link></button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
