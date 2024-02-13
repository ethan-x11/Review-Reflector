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
    mapframe: '',
    map: "rounded-2xl",
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
        <div className={style.wrapper}>
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.left}>
                        <h3 className={style.heading}>Educational Point</h3>
                        <p className={style.items}>
                            <FaMapMarkerAlt /> {address} <br/> {newaddress}  <Link href={googleMapsLink} className='underline' target="_blank">View on Google Maps</Link>
                        </p>
                        <p className={style.items}><FaPhone /><Link href='tel:917003626799'> {phone} </Link></p>
                        <p className={style.items}><FaEnvelope /><Link href='mailto:Educationalpoint2510@gmail.com'> {email} </Link></p>
                        <p className={style.items}><FaWhatsapp /><Link href='https://api.whatsapp.com/send?phone=919804988185'>  {whatsapp} </Link></p>
                        <p className={style.items}>Govt. Registration No: WB-14-0042587</p>
                        <p className={style.items}>ISO - 9001 : 2015</p>
                    </div>
                    <div className={style.right}>
                        <div className={style.mapframe}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14732.10085677282!2d88.41502498715823!3d22.6155336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275bda6614905%3A0x18fc41c3e3c1acbc!2sEducational%20point!5e0!3m2!1sen!2sin!4v1699819101305!5m2!1sen!2sin"
                                width="400"
                                height="300"
                                loading="lazy"
                                className={style.map}
                            ></iframe>
                            I</div>
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
