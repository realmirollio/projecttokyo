import React, { useState } from "react";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/3dff7900-8cdc-11ed-a003-6f0b76086b1c";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };
  
  return (
    <div>
      <h1 className='text-3xl sm:text-5xl text-white text-gradient justify-center items-center flex pt-35 pb-10'>
        Имате запитване? Свържете се с нас сега!
      </h1>
      
      <div className="p-5 w-1/2 container mx-auto jsutify-center blue-glassmorphism text-white">
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="POST"
          target="_blank"
        >
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Име"
          name="name"
          className="my-2 w-full rounded-lg p-2 outline-none bg-transparent border-none text-sm white-glassmorphism"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="my-2 w-full rounded-lg p-2 outline-none bg-transparent border-none text-sm white-glassmorphism"
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <textarea
          placeholder="Вашето съобщение"
          name="message"
          className="my-2 w-full rounded-lg p-2 outline-none bg-transparent border-none text-sm white-glassmorphism"
          required
        />
      </div>
      <div className='h-[1px] w-full bg-gray-400 my-2' />
      <div className="mb-3 pt-0">
        <button
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#333366]"
          type="submit"
        >
          Изпращане
        </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default ContactForm;