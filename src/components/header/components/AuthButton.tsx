const AuthButton = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <button className='rounded-full p-1 hover:bg-white/20 transition-all duration-300 inline-block cursor-pointer'>
      {icon}
    </button>
  );
};

export default AuthButton;
