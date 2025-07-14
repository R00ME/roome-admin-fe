import InputField from "./InputField";

export default function Form({ title, fields, onClick }: FormProps) {
  return (
    <>
      <h1 className='font-bold text-2xl text-[#4983ef]'>{title}</h1>
      <form
        action='#'
        className='flex flex-col gap-3'>
        {fields.map(({ id, label, type, placeholder, icon }) => (
          <InputField
            key={id}
            id={id}
            label={label}
            type={type}
            placeholder={placeholder}
            icon={icon}
          />
        ))}
      </form>
      <div className='flex flex-col items-center gap-2 mt-3'>
        <button
          type='submit'
          className='w-full bg-[#B9C2D1] rounded-full h-13 text-white font-semibold '>
          {title === "운영자 로그인" ? "로그인" : "임시 비밀번호 재발급"}
        </button>
        {title === "운영자 로그인" && (
        <span className='flex items-center gap-1 font-medium text-sm text-[#888888]'>
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
