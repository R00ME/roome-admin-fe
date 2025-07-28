import LogoutIcon from '@/assets/icons/header/logout-icon.svg?react';
import { logoutAPI } from '../../../apis/auth';

const AuthButton = () => {

  const handleLogout = async () =>{
    try{
      await logoutAPI();
    } catch(error){
      alert("🚨 로그아웃 중 에러 발생")
    }
  }


  return (
    <button 
      onClick={handleLogout}
      className='rounded-full p-1 hover:bg-white/20 transition-all duration-300 inline-block cursor-pointer'>
      <LogoutIcon className='text-white' />
    </button>
  );
};

export default AuthButton;
