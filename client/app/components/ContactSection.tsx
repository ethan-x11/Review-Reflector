import React, { useState } from 'react'
const axios = require('axios');

const style = {
    main: 'w-screen px-8 md:px-32 py-16 bg-[#ffe08f] dark:bg-[#DAA520]/60',
    container: 'flex flex-col md:flex-row justify-between items-start gap-6',
    left: 'w-full md:w-1/2 mt-8 flex flex-col justify-center items-center text-center md:text-left md:items-start',
    leftheading: 'text-2xl md:text-4xl font-bold',
    leftsubheading: 'text-xl mt-4',
    right: 'w-full md:w-1/2',
    form: 'flex flex-col justify-between items-start bg-white/80 p-6 md:p-16 rounded-lg',
    formheading: 'text-3xl font-bold',
    formtitles: 'text-md md:text-xl font-bold my-2',
    formrow: 'flex flex-row justify-between gap-6 items-center w-full',
    formbase: 'flex flex-col justify-between items-start',
    forminput: 'text-sm md:text-md placeholder-white placeholder-opacity-60 w-full h-8 bg-[#1f2937]/50 rounded-lg px-4 ',
    formoptionbox: 'text-sm md:text-md placeholder-white placeholder-opacity-60 w-full h-8 bg-[#1f2937]/50 rounded-lg px-4 ',
    formtextinput: 'text-sm md:text-md placeholder-white placeholder-opacity-60 w-full bg-[#1f2937]/50 rounded-lg px-4 ',
    formoption: 'text-white',
    formbutton: 'text-xl md:text-2xl font-bold bg-yellow-500/90 rounded-3xl px-4 py-2 mt-4 hover:bg-yellow-600 hover:text-white',
}

const ContactSection = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [medium, setMedium] = useState('');
    const [classType, setClassType] = useState('');
    const [course, setCourse] = useState('');
    const [board, setBoard] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [anythingElse, setAnythingElse] = useState('');
    const data = { name, number, email, gender, medium, classType, course, board, instituteName, anythingElse };

    const handleClassTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassType(event.target.value);
    };

    const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBoard(event.target.value);
    };

    const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCourse(event.target.value);
    };

    const formId = process.env.FORM_ID;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(number)) {
            alert('Please enter a valid 10 digit phone number');
            return;
        }

        const formData = new FormData();
        formData.append('entry.680767568', name);
        formData.append('entry.1344312139', number);
        formData.append('entry.1238632392', email);
        formData.append('entry.239529545', gender);
        formData.append('entry.1581099107', medium);
        formData.append('entry.1573435181', classType);
        formData.append('entry.1241448394', course);
        formData.append('entry.2056989786', board);
        formData.append('entry.53252272', instituteName);
        formData.append('entry.907542412', anythingElse);

        try {
            const response = await axios.post(
                `https://docs.google.com/forms/d/e/${formId}/formResponse`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            console.log('Form submitted successfully');
            console.log(response.data);
        } catch (error: any) {
            // console.error('Error submitting form:', error.message);
        }

        // console.log('Form submitted');
        console.log(data);
    }

    return (
        <div className={style.main} id="contact">
            <div className={style.container}>
                <div className={style.left}>
                    <h3 className={style.leftheading}>
                        Admission Enquiry
                    </h3>
                    <p className={style.leftsubheading}>
                        Please fill out the form to enquire about admission to our tuition center.
                    </p>
                </div>
                <div className={style.right}>
                    <form onSubmit={handleSubmit} className={style.form}>
                        {/* <h3 className={style.formheading}>Admission Enquiry Form</h3> */}
                        <div className={style.formrow}>
                            <div className={style.formbase}>
                                <label className={style.formtitles}>Student Name</label>
                                <input className={style.forminput}
                                    type="text"
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    name="studentName"
                                    required
                                />
                            </div>
                            <div className={style.formbase}>
                                <label className={style.formtitles}>Phone Number</label>
                                <input className={style.forminput}
                                    type="tel"
                                    name="phone"
                                    id="phoneNumber"
                                    placeholder="Enter your Phone Number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <label className={style.formtitles}>Email ID</label>
                        <input className={style.forminput}
                            type="email"
                            name="email"
                            id="emailid"
                            placeholder="Enter your Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className={style.formrow}>
                            <div className={style.formbase}>
                                <label className={style.formtitles}>Select Gender</label>
                                <select className={style.formoptionbox}
                                    name="gender"
                                    id="gender"
                                    placeholder="Select your Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">--Gender--</option>
                                    <option className={style.formoption} value="Male">Male</option>
                                    <option className={style.formoption} value="Female">Female</option>
                                    <option className={style.formoption} value="Others">Others</option>
                                </select>
                            </div>
                            <div className={style.formbase}>
                                <label className={style.formtitles}>Select Medium</label>
                                <select className={style.formoptionbox}
                                    name="medium"
                                    id="medium"
                                    placeholder="Select your Medium"
                                    value={medium}
                                    onChange={(e) => setMedium(e.target.value)}
                                    required
                                >
                                    <option value="">--Language--</option>
                                    <option className={style.formoption} value="English">English</option>
                                    <option className={style.formoption} value="Hindi">Hindi</option>
                                    <option className={style.formoption} value="Bengali">Bengali</option>
                                </select>
                            </div>
                        </div>
                        <label className={style.formtitles}>Select Class</label>
                        <select className={style.formoptionbox} name="classType" value={classType} onChange={handleClassTypeChange} required>
                            <option value="">--Select Class--</option>
                            <option className={style.formoption} value="School Boards">School Boards</option>
                            <option className={style.formoption} value="B.Com">B.Com</option>
                            <option className={style.formoption} value="Computer Science">Computer Science</option>
                            <option className={style.formoption} value="CA">CA</option>
                            <option className={style.formoption} value="CMA">CMA</option>
                            <option className={style.formoption} value="Computer Course">Computer Course</option>
                        </select>
                        {classType === 'School Boards' && (
                            <>
                                <label className={style.formtitles}>Board</label>
                                <select className={style.formoptionbox} name="board" value={board} onChange={handleBoardChange} required>
                                    <option value="">--Select Board--</option>
                                    <option className={style.formoption} value="ICSE">ICSE</option>
                                    <option className={style.formoption} value="CBSE">CBSE</option>
                                    <option className={style.formoption} value="WBSE">WBSE</option>
                                    <option className={style.formoption} value="ISC">ISC</option>
                                </select>
                            </>
                        )}
                        <label className={style.formtitles}>Institute Name</label>
                        <input className={style.forminput}
                            type="text"
                            name="instituteName"
                            id="instituteName"
                            placeholder="Enter your College/School Name"
                            value={instituteName}
                            onChange={(e) => setInstituteName(e.target.value)}
                            required
                        />

                        {classType === 'Computer Course' && (
                            <>
                                <label className={style.formtitles}>Course</label>
                                <select className={style.formoptionbox} name="course" value={course} onChange={handleCourseChange} required>
                                    <option value="">--Select Course--</option>
                                    <option className={style.formoption} value="Computer Basic">Computer Basic</option>
                                    <option className={style.formoption} value="Programming Language">Programming Language</option>
                                    <option className={style.formoption} value="Operating System">Operating System</option>
                                    <option className={style.formoption} value="Database">Database</option>
                                    <option className={style.formoption} value="Photoshop">Photoshop</option>
                                    <option className={style.formoption} value="Graphics Designing">Graphics Designing</option>
                                    <option className={style.formoption} value="Tally">Tally</option>
                                </select>
                            </>
                        )}
                        <label className={style.formtitles}>Anything Else</label>
                        <textarea className={style.formtextinput}
                            name="anythingElse"
                            id="anythingElse"
                            placeholder="Any other info you want to share with us"
                            value={anythingElse}
                            onChange={(e) => setAnythingElse(e.target.value)}
                        ></textarea>
                        <button className={style.formbutton} type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactSection