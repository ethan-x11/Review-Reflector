import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const style = {
    // main: "w-full py-2 bg-[#26272b]",
    wrapper: 'bg-[#26272b] md:bg-[#e23832]',
    main: "w-full py-2 md:bg-footerbg md:bg-cover md:h-dvh flex flex-col justify-end",
    container: "pb-8 pt-6 px-8 md:px-32 flex flex-col md:flex-row justify-between items-center ",
    left: "md:w-1/2 pb-8 md:pb-0",
    heading: "text-white pb-6 text-xl md:text-2xl",
    items: "flex flex-row justify-start gap-4 py-2 items-center text-white",
    right: "",
    bottom: "",
    copyright: "text-center",
}

const Footer = () => {
    const address = 'Near Jyangra Ghosh Para, Kolkata - 700009';
    const newaddress = '2nd Branch - Loknath near Hanuman Mandir';
    const phone = '+91 70036-26799';
    const email = 'Educationalpoint2510@gmail.com';
    const whatsapp = '9804988185';
    const googleMapsLink = 'https://maps.app.goo.gl/WL9wUFoxuMRPNZDA6';

    return (
        <div id="contact" className={style.wrapper}>
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.left}>
                        L
                    </div>
                    <div className={style.right}>
                        R
                    </div>
                </div>
                <div className={style.bottom}>
                    <hr />
                    <p className={style.copyright}>COPYRIGHT (C) 2023 EDUCATIONAL POINT</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
