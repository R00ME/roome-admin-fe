import { useState } from 'react';
import hamburgerIcon from '@/assets/icons/sidebar/hamburger-menu-icon.svg';
import MenuList from './components/MenuList';
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`h-screen bg-[#F9F9F9] transition-all duration-200 flex flex-col  gap-4 py-4
        ${isExpanded ? 'w-52 items-start' : 'w-20 items-center'}
      `}>
      <button
        className={`text-2xl cursor-pointer ${
          isExpanded ? 'ml-6' : ''
        }`}
        onClick={() => setIsExpanded((prev) => !prev)}>
        <img
          src={hamburgerIcon}
          alt='hamburger-menu-icon'
        />
      </button>
      <MenuList isExpanded={isExpanded} />
    </aside>
  );
};

export default Sidebar;
