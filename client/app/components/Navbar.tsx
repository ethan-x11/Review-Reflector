
import { FaBars, FaAngleDown } from 'react-icons/fa';
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes';

type NavbarProps = {
    onNavClick: (sectionName: string) => void;
}

const style = {
    main: "fixed top-0 left-0 w-full h-12 z-20 mt-6",
    container: "container mx-auto px-4 sm:px-6 md:px-32 h-full gap-x-[2rem] flex flex-row justify-between items-center",
    logowrap: "h-full px-2 rounded-full bg-white/50 hover:bg-opacity-70 backdrop-blur-lg drop-shadow-lg",
    logo: "h-full w-full m-2 text-black font-bold text-[max(1vw,1.2rem)] hover:text-black cursor-pointer",
    navwrap: "hidden md:flex flex-row justify-between items-center h-full px-4 sm:px-6 md:px-8 rounded-full bg-white/50 hover:bg-opacity-70 backdrop-blur-lg drop-shadow-lg",
    buttons: "flex flex-row justify-between items-center gap-x-[6vw] text-black font-bold",
    button: "flex items-center text-black text-opacity-70 px-2 hover:text-yellow-500 text-[max(0.9vw,0.8rem)]",
    contwrap: "hidden md:flex bg-white border-2 h-full items-center hover:bg-yellow-100 text-blue-500 font-bold py-2 px-4 rounded-full",
    contact: "bg-gradient-to-r from-red-500 via-yellow-600 to-red-500 text-transparent bg-clip-text text-[max(1vw,0.8rem)]",
    menu: "md:hidden",
    dropdown: "absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg z-10 text-black",
    dropdownItem: "px-4 py-2 hover:bg-gray-200 cursor-pointer",
    activeButton: "text-red-500",
}

const Navbar = ({ onNavClick }: NavbarProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const theme = document.documentElement.classList.toString().includes('dark');
    // console.log("Meow", theme);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleNavClick = (sectionName: string, buttonIndex: number) => {
        onNavClick(sectionName);
        setActiveButton(buttonIndex);
        setShowDropdown(false);
    }

    return (
        <>
            <div className={style.main}>
                <div className={style.container}>
                    <div className={style.logowrap}>
                        <Link href="/">
                            {/* <Image src={LogoIcon} alt="Logo" className={style.logo} onClick={() => handleNavClick('homepage', -1)} /> */}
                            <h2 className={style.logo}>
                                Review Reflector
                            </h2>
                        </Link>
                    </div>

                    <div className={style.navwrap}>
                        <ul className={style.buttons}>
                            <Link href="/#">
                                <li className={style.button} onClick={() => handleNavClick('home', -1)}>
                                    <p className={`${style.button} ${activeButton === 0 ? style.activeButton : ''}`}>HOME</p>
                                </li>
                            </Link>
                            <li className={style.button}>
                                <Link href="/#about">
                                    <p className={`${style.button} ${activeButton === 6 ? style.activeButton : ''}`} onClick={() => handleNavClick('abou', -1)}>ABOUT</p>
                                </Link>
                            </li>
                            <li className={style.button}>
                                <Link href="/#contact">
                                    <p className={`${style.button} ${activeButton === 3 ? style.activeButton : ''}`} onClick={() => handleNavClick('contact', 3)}>CONTACT</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className={style.menu}>
                        <FaBars onClick={toggleDropdown} />
                        {showDropdown && (
                            <div className={`${style.dropdown} w-screen `} ref={dropdownRef}>
                                <Link href="/#courses" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('courses', 0)}>COACHING SERVICES</div>
                                </Link>
                                <Link href="/#gallery" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('gallery', 6)}>GALLERY</div>
                                </Link>
                                <Link href="/#blog" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('blog', 3)}>BLOG</div>
                                </Link>
                                <Link href="/#about" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('about', 4)}>ABOUT US</div>
                                </Link>
                                <Link href="/#contact-us" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('contact', 5)}>CONTACT US</div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;    