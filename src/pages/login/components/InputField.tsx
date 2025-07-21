import React from 'react';

const InputField = React.memo(
  ({ id, label, type, placeholder, icon, error, value, onChange }: Field) => (
    <fieldset className='flex flex-col gap-1 relative'>
      {icon && (
        <img
          src={icon}
          alt=''
          className='w-5 aspect-square absolute top-11 left-3'
        />
      )}
      <label
        htmlFor=''
        className='text-[#2a4d90] font-semibold'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`font-medium text-[#1c3351] w-full h-13 border-1 placeholder-[#223250]/30 rounded-md focus:outline-none
          ${icon ? 'pl-10' : 'pl-3'}
          ${error ? 'border-[#cd345c] focus:border-[#cd345c]' : 'border-[#94acd8]/30 focus:border-[#2a4d90] border-2'}`}
      />
      {error && <p className='text-[#ab283e] font-medium text-xs pl-1'>{error}</p>}
    </fieldset>
  ),
);

export default InputField;
