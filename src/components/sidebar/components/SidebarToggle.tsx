import hamburgerIcon from '@/assets/icons/sidebar/hamburger-menu-icon.svg';

interface SidebarToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SidebarToggle = ({ isExpanded, onToggle }: SidebarToggleProps) => {
  return (
    <button
      className={`text-2xl cursor-pointer select-none ${
        isExpanded ? 'ml-6' : ''
      }`}
      onClick={onToggle}>
      <img
        src={hamburgerIcon}
        alt='hamburger-menu-icon'
        className='[-webkit-user-drag:none] select-none pointer-events-none'
      />
    </button>
  );
};

export default SidebarToggle;
