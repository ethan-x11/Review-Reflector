
import { FaBars, FaAngleDown } from 'react-icons/fa';
import React, { useState, useRef } from "react";
import Link from "next/link";
import LogoIcon from "@/app/images/logos_transparent.png";
import LogoWhite from "@/app/images/logos_white.png";
import Image from "next/image";
import { useTheme } from 'next-themes';

type NavbarProps = {
    onNavClick: (sectionName: string) => void;
}

const style = {
    main: "fixed top-0 left-0 w-full h-12 z-20 mt-6",
    container: "container mx-auto px-4 sm:px-6 md:px-8 h-full gap-x-[2rem] flex flex-row justify-between items-center",
    logowrap: "h-full px-2 rounded-full bg-[#e23832] hover:bg-opacity-80 backdrop-blur-lg drop-shadow-lg",
    logo: "h-full w-full p-2",
    navwrap: "hidden md:flex flex-row justify-between items-center h-full px-4 sm:px-6 md:px-8 rounded-full bg-white bg-opacity-50 hover:bg-opacity-70 backdrop-blur-lg drop-shadow-lg",
    buttons: "flex flex-row justify-between items-center gap-x-[3vw] text-black font-bold",
    button: "flex items-center text-black text-opacity-70 hover:text-yellow-500 text-[max(0.9vw,0.8rem)]",
    contwrap: "hidden md:flex bg-white border-2 h-full items-center hover:bg-yellow-100 text-blue-500 font-bold py-2 px-4 rounded-full",
    contact: "bg-gradient-to-r from-red-500 via-yellow-600 to-red-500 text-transparent bg-clip-text text-[max(1vw,0.8rem)]",
    menu: "md:hidden",
    dropdown: "absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg z-10 text-black",
    dropdownItem: "px-4 py-2 hover:bg-gray-200 cursor-pointer",
    activeButton: "text-red-500",
}

const Navbar = ({ onNavClick }: NavbarProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const theme = document.documentElement.classList.toString().includes('dark');
    // console.log("Meow", theme);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleMouseEnter = () => {
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
            setDropdownTimeout(null);
        }
        setShowDropdown(true);
    }

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setShowDropdown(false);
            setDropdownTimeout(null);
        }, 100);
        setDropdownTimeout(timeout);
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
                            <Image src={LogoIcon} alt="Logo" className={style.logo} onClick={() => handleNavClick('homepage', -1)} />
                        </Link>
                    </div>
                    <div className={style.navwrap}>
                        <ul className={style.buttons}>
                            <Link href="/#courses">
                                <li className={style.button} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleNavClick('courses', -1)}>
                                    <p className={`${style.button} ${activeButton === 0 ? style.activeButton : ''}`}>COACHING SERVICES</p>
                                    {/* <FaAngleDown />  */}
                                    {/* {showDropdown && (
                                    <div className={style.dropdown} ref={dropdownRef}>
                                        <Link href="/#school-boards">
                                            <div className={style.dropdownItem} onClick={() => handleNavClick('school', 0)}>School Boards</div>
                                        </Link>
                                        <Link href="/#bcom">
                                            <div className={style.dropdownItem} onClick={() => handleNavClick('bcom', 0)}>B.Com</div>
                                        </Link>
                                        <Link href="/#pc">
                                            <div className={style.dropdownItem} onClick={() => handleNavClick('pc', 0)}>CS, CA, CMA </div>
                                        </Link>
                                    </div>
                                )} */}
                                </li>
                            </Link>
                            {/* <li className={style.button}>
                                <Link href="/#computer-courses">
                                    <p className={`${style.button} ${activeButton === 1 ? style.activeButton : ''}`} onClick={() => handleNavClick('cscourse', 1)}>COMPUTER COURSES</p>
                                </Link>
                            </li> */}
                            {/* <li className={style.button}>
                                <Link href="/#student-zone">
                                    <p className={`${style.button} ${activeButton === 2 ? style.activeButton : ''}`} onClick={() => handleNavClick('student', 2)}>STUDENT ZONE</p>
                                </Link>
                            </li> */}
                            <li className={style.button}>
                                <Link href="/#gallery">
                                    <p className={`${style.button} ${activeButton === 6 ? style.activeButton : ''}`} onClick={() => handleNavClick('gallery', -1)}>GALLERY</p>
                                </Link>
                            </li>
                            <li className={style.button}>
                                <Link href="/#blog">
                                    <p className={`${style.button} ${activeButton === 3 ? style.activeButton : ''}`} onClick={() => handleNavClick('blog', 3)}>BLOG</p>
                                </Link>
                            </li>
                            <li className={style.button}>
                                <Link href="/#about">
                                    <p className={`${style.button} ${activeButton === 4 ? style.activeButton : ''}`} onClick={() => handleNavClick('about', 4)}>ABOUT US</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <button className={style.contwrap} onClick={() => handleNavClick('contact', 5)}>
                        <div className={style.contact}>
                            Contact Us
                        </div>
                    </button>
                    <div className={style.menu}>
                        <FaBars onClick={toggleDropdown} />
                        {showDropdown && (
                            <div className={`${style.dropdown} w-screen `} ref={dropdownRef}>
                                <Link href="/#courses" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('courses', 0)}>COACHING SERVICES</div>
                                </Link>
                                {/* <Link href="/#school-boards" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('school', 0)}>School Boards</div>
                                </Link>
                                <Link href="/#bcom" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('bcom', 0)}>B.Com</div>
                                </Link>
                                <Link href="/#professional-courses" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('pc', 0)}>CS, CA, CMA</div>
                                </Link>
                                <Link href="/#computer-courses" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('cscourse', 1)}>COMPUTER COURSES</div>
                                </Link> */}
                                <Link href="/#gallery" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('gallery', 6)}>GALLERY</div>
                                </Link>
                                {/* <Link href="/#student-zone" onClick={toggleDropdown}>
                                    <div className={style.dropdownItem} onClick={() => handleNavClick('student', 2)}>STUDENT ZONE</div>
                                </Link> */}
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