import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsappButton = ({ phoneNumber }: { phoneNumber: string }) => {
    const [isHovered, setIsHovered] = useState(false);


    const styles = {
        button: "fixed bottom-4 left-4 z-50 rounded-full p-2 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center",
        icon: "w-6 h-6",
        text: "ml-2 text-sm font-medium",
    }

    const handleClick = () => {
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
        window.open(url, "_blank");
    };

    const buttonVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.3,
            },
        },
    };

    const textVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <motion.button
            className={styles.button}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={buttonVariants}
        >
            <FaWhatsapp className={styles.icon} />
            <motion.span
                className={isHovered ? styles.text : "hidden"}
                variants={textVariants}
                animate={isHovered ? "visible" : "hidden"}
            >
                Chat on WhatsApp
            </motion.span>
        </motion.button>
    );

};

export default WhatsappButton;
