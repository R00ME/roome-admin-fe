import React from "react";

const InputField = React.memo(({ id, label, type, placeholder, icon }:Field) => (
  <fieldset className='flex flex-col gap-1 relative'>
    <img
      src={icon}
      alt=''
      className='w-5 aspect-square absolute top-11 left-3'
    />
    <label
      htmlFor=''
      className='text-[#2a4d90] font-semibold'>
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className='w-102 h-13 border-2 placeholder-[#223250]/30 rounded-md border-[#2a4d90]/30 pl-10'
    />
  </fieldset>
));

export default InputField;
