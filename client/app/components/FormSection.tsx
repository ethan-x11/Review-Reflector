import React, { useState, useEffect } from 'react';
import axios from 'axios';

const style = {
  main: 'pt-16 bg-[#ffe08f]',
  container: 'max-w-screen-lg mx-auto py-16 md:py-28 px-8 md:px-16 lg:px-32',
  form: 'w-full py-2 flex flex-col justify-end gap-4',
  button: 'bg-[#7a1e0b] w-1/4 mx-auto py-2 rounded-full text-[max(1vw,0.8rem)] font-bold',
  input: 'bg-white dark:bg-[#26272b] border-2 border-white/50 w-full p-2 rounded-full text-black dark:text-white text-[max(1vw,0.8rem)] ',
}

const FormSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    aurl: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fetchdata = async () => {
    const url = "https://review-reflector-server.onrender.com/amazon";
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Bypass-Tunnel-Reminder"] = "1";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    try {
      const { data } = await axios.post(
        url,
        JSON.stringify(formData)
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      fetchdata();
      // Handle the response data here
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="Enter the url of your product"
            name="aurl"
            value={formData.aurl}
            onChange={handleChange}
            required
          />
          <input
            className={style.input}
            type="email"
            placeholder="Enter your mail id"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button className={style.button} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormSection