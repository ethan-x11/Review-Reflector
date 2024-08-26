import React from 'react'

const About = () => {
    const style = {
        main: 'pt-16 bg-[#ffe08f]',
        container: 'max-w-screen-lg mx-auto py-16 md:py-28 px-8 md:px-16 lg:px-32'
    }

    return (
        <div id="about" className={style.main}>
            <div className={style.container}>
                About this Project..........
                Nothing Much What about you??
            </div>
        </div>
    )
}

export default About