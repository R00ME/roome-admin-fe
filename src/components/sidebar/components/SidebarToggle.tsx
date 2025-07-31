import arrowIcon from '@/assets/icons/header/arrow-icon.svg';

interface SidebarToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SidebarToggle = ({ isExpanded, onToggle }: SidebarToggleProps) => {
  return (
    <button
      className={`fixed text-2xl cursor-pointer select-none bg-[#F7FBFE] opacity-50 hover:opacity-100 rounded-full top-1/2 left-0 transition-transform duration-300 ease-in-out ${
        isExpanded
          ? 'translate-x-43 -translate-y-81.5'
          : 'translate-x-[88px] bg-none'
      }`}
      onClick={onToggle}>
      <img
        src={arrowIcon}
        alt='hamburger-menu-icon'
        className={`[-webkit-user-drag:none] select-none pointer-events-none 
          ${isExpanded ? '' : 'scale-x-[-1]'}  
        `}
      />
    </button>
  );
};

export default SidebarToggle;
