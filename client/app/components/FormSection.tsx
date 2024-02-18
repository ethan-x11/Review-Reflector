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
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchurl();
  })

  const fetchurl = async () => {
    const url = "https://144ccce3-935c-4085-af86-6ccfaa8cee00-00-36n6naik0hkiu.picard.replit.dev/fetch";
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Bypass-Tunnel-Reminder"] = "1";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    try {
      const { data } = await axios.post(
        url,
        {
          name:"BTC",
          cur:"INR",
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  // try {
  //   const response = await axios.post(options.url, datas);
  //   console.log(response.data);
  // } catch (error) {
  //   console.error(error);
  // }
  // alert("Data Found")



const handlesubmit = () => {
  alert("Form Submitted")
}

return (


  <div className={style.main}>
    <div className={style.container}>
      <form className={style.form}>
        <input className={style.input} type="text" placeholder="Enter the url of your product" />
        <input className={style.input} type="email" placeholder="Enter your mail id" />
        <button onClick={handlesubmit} className={style.button} type="submit">Submit</button>
      </form>
    </div>
  </div>
)
}

export default FormSection