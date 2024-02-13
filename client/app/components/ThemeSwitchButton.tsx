import { useState, useEffect } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeSwitchButton() {
    // const theme = document.documentElement.classList.toString();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleTheme = () => {
        // console.log(document.documentElement.classList.toString());
        setIsDarkMode((prevMode) => !prevMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <button
            className="fixed bottom-4 right-4 p-2 rounded-full transition-colors duration-300 bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={toggleTheme}
        >
            {isDarkMode ? (
                <HiSun className="w-6 h-6 text-gray-800 dark:text-white" />
            ) : (
                <HiMoon className="w-6 h-6 text-gray-800 dark:text-white" />
            )}
        </button>
    );
}
