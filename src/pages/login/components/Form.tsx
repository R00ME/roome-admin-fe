import InputField from "./InputField";

export default function Form({ title, fields, onClick, values, onChangeField, onSubmit, errors, isValid }: FormProps) {
  return (
    <>
      <h1 className='font-bold text-2xl text-[#367af8]'>{title}</h1>
      <form
        action='#'
        className='flex flex-col gap-3 w-full'>
        {fields.map(({ id, label, type, placeholder, icon }) => (
          <InputField
            key={id}
            id={id}
            label={label}
            type={type}
            placeholder={placeholder}
            icon={icon}
            error={errors?.[id]}
            value={values[id]?? ''}
            onChange={(e) => onChangeField?.(id, e.target.value)}
          />
          
        ))}
      </form>
      <div className='flex flex-col items-center gap-4 mt-1 w-full'>
        <button
          type='button'
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full ${isValid ? 'bg-[#367af8]' : 'bg-[#ccd6e6]'} rounded-lg h-13 text-white font-semibold`}>
          {title === "Welcome Back!" ? "로그인" : "임시 비밀번호 재발급"}
        </button>
        {title === "Welcome Back!" && (
        <span className='flex items-center gap-1 font-medium text-xs text-[#888888]'>
          <p className="text-[#888888]/60" >가입된 이메일로</p>
          <button 
            type="button"
            className='underline decoration-[#888888]'
            onClick={onClick}> 
            임시 비밀번호 재발급
          </button>
        </span>
        )}
      </div>
    </>
  );
}
