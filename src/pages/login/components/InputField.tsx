import React from "react";

const InputField = React.memo(({ id, label, type, placeholder, icon }:Field) => (
  <fieldset className='flex flex-col gap-1 relative'>
    {icon && (
      <img
      src={icon}
      alt=''
      className='w-5 aspect-square absolute top-11 left-3'
    />)}
    <label
      htmlFor=''
      className='text-[#2a4d90] font-semibold'>
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`font-medium w-102 h-13 border-2 placeholder-[#223250]/30 rounded-md border-[#2a4d90]/30 ${ icon ? "pl-10" : "pl-3" }`}
    />
  </fieldset>
));

export default InputField;
