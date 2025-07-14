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
        className={`font-medium text-[#2E2E2E] w-102 h-13 border-2 placeholder-[#223250]/30 rounded-md focus:outline-none
          ${icon ? 'pl-10' : 'pl-3'}
          ${error ? 'border-[#a53d4e] focus:border-[#a53d4e]' : 'border-[#2a4d90]/30 focus:border-[#2a4d90]'}`}
      />
      {error && <p className='text-[#ab283e] font-medium text-sm pl-3'>{error}</p>}
    </fieldset>
  ),
);

export default InputField;
