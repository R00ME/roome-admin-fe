import searchIcon from '@/assets/icons/header/search-icon.svg';

const HeaderSearchBar = () => {
  return (
    <div className='flex items-center gap-2 p-2 mx-2 bg-white/20 rounded-full'>
      <input
        type='text'
        placeholder='사용자 조회'
        className='bg-transparent outline-none px-2 placeholder:text-white/50'
      />
      <button className='rounded-full p-2 bg-white/80 hover:bg-white/50 transition-all duration-300 inline-block cursor-pointer'>
        <img
          src={searchIcon}
          alt='search'
        />
      </button>
    </div>
  );
};

export default HeaderSearchBar;
