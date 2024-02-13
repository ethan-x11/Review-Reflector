
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import HeroSection from '@/app/components/HeroSection'
import FormSection from '@/app/components/FormSection'
import About from './About';

const style = {
    main: '',
    component: 'fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-50',
    loading: 'animate-spin',
}

const Homepage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(false);
    }, [])

    return (
        <>
            {loading ? (
                // Skeleton loading
                <div className={style.component}>
                    <FaSpinner className={style.loading} size={50} color={'#000'} />
                </div>
            ) : (
                <>
                    <HeroSection />
                    <FormSection />
                    <About />
                </>
            )} 
        </>
    )
}

export default Homepage