import Link from "next/link";
import { title } from "process";
import React from "react";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaWhatsapp,
} from "react-icons/fa";

const style = {
    // main: "w-full py-2 bg-[#26272b]",
    wrapper: "bg-black",
    main: "w-full py-2   flex flex-col justify-end bg-white/10 backdrop-blur-lg ",
    container:"pb-8 pt-6 px-8 md:px-32 flex flex-col md:flex-row justify-between items-center ",
    left: "md:w-1/2 pb-8 md:pb-0",
    heading: "text-white pb-6 text-xl md:text-2xl",
    items: "flex flex-row justify-start gap-4 py-2 items-center text-white",
    right: "md:w-1/2 pb-8 md:pb-0",
    bottom: "",
    copyright: "text-center",
    title: "text-2xl font-bold ",
};

const Footer = () => {
    const email = "";
    const whatsapp = "";

    return (
        <div id="contact" className={style.wrapper}>
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.left}>
                        <div className={style.heading}>
                            <h2 className={style.title}>Team Members</h2>
                            <p>Subhanjan Dutta - subhanjan.dutta@gmail.com</p>
                            <p>Anusha Bera - anusha.bera@gmail.com</p>
                            <p>Gourav Shaw - shawgourav62@gmail.com</p>
                            <p>Sugato Bagchi - sugato.bagchi@gmail.com</p>
                        </div>
                    </div>
                    <div className={style.right}>
                    <div className={style.heading}>
                            <h2 className={style.title}>Technologies Used</h2>
                            <p>NextJs</p>
                            <p>Machine Learning</p>
                            <p>Python</p>
                            <p>Nodejs</p>
                        </div>
                    </div>
                    
                </div>
                <div className={style.bottom}>
                    <hr />
                    <p className={style.copyright}>COPYRIGHT (C) 2024 MEOW</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
