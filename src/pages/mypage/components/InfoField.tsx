type InfoFieldProps = {
  icon: React.ReactNode;
  label?: string;
  value?: string; 
  badge?: string;
  link?: string;
  isEditing?: boolean;
  type?: string;
  disabled?: boolean;
};

export default function InfoField({
  icon,
  label,
  value,
  badge,
  link,
  isEditing = false,
  type = 'text',
  disabled = false,
}: InfoFieldProps) {
  return (
    <div className='flex items-center gap-4 w-full text-sm'>
      {icon}
      {isEditing ? (
        <input
          type={type}
          defaultValue={value}
          disabled={disabled}
          readOnly={disabled}
          className={`flex-1 px-3 py-2 border rounded-md outline-none
            ${disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 focus:ring-2 focus:ring-[#4983EF]'}`}
        />
      ) : (
        <>
          <span>{label}</span>
          {badge && (
            <span className='text-[10px] font-medium text-[#4983EF] bg-[#DEEBFF]/80 rounded-full px-2.5 py-1'>
              {badge}
            </span>
          )}
          {link && (
            <a href={link} className='text-[#4983EF] underline text-xs ml-auto'>
              {link}
            </a>
          )}
        </>
      )}
    </div>
  );
}
