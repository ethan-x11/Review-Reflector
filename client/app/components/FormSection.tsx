import React from 'react'

const style = {
  main: 'pt-16 bg-[#ffe08f]',
  container: 'max-w-screen-lg mx-auto py-16 md:py-28 px-8 md:px-16 lg:px-32',
  form: 'w-full py-2 flex flex-col justify-end gap-4',
  button: 'bg-[#7a1e0b] w-1/4 mx-auto py-2 rounded-full text-[max(1vw,0.8rem)] font-bold',
  input: 'bg-white dark:bg-[#26272b] border-2 border-white/50 w-full p-2 rounded-full text-white text-[max(1vw,0.8rem)]',
}

const FormSection = () => {
  const handlesubmit = () => {
    alert("Form Submitted")
  }
  return (
    
    
    <div className={style.main}>
      <div className={style.container}>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder="Enter the url of your product" />
          <input className={style.input} type="email" placeholder="Enter your mail id" />
          <button onClick={handlesubmit}className={style.button} type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default FormSection