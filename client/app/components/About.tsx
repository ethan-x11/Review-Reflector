import React from 'react'

const About = () => {
    const style = {
        main: 'pt-16 bg-[#ffe08f]',
        container: 'max-w-screen-lg mx-auto py-16 md:py-28 px-8 md:px-16 lg:px-32'
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <h1 className="text-4xl font-bold mb-8">About Us</h1>
                <p className="text-lg mb-4">We are a tuition center dedicated to helping students achieve their academic goals. Our experienced tutors provide personalized attention to each student to ensure their success.</p>
                <p className="text-lg mb-4">We offer a variety of courses for students of all ages and levels, including test preparation, subject-specific tutoring, and college admissions counseling.</p>
                <p className="text-lg mb-4">Contact us today to learn more about how we can help you or your child succeed!</p>
            </div>
        </div>
    )
}

export default About