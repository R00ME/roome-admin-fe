import useLocalStorage from '@/hooks/useLocalStorage';
import Logo from '../header/components/Logo';
import MenuList from './components/MenuList';
import SidebarToggle from './components/SidebarToggle';

const SIDEBAR_STATE_KEY = 'sidebar-expanded';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useLocalStorage(SIDEBAR_STATE_KEY, true);

  return (
    <>
      <aside
        className={`h-screen bg-white shadow-lg transition-all duration-200 flex flex-col gap-4 py-4
        ${isExpanded ? 'w-52 items-start' : 'w-20 items-center'}
        `}>
        <div className='flex flex-row justify-between w-full px-5'>
          <div className='flex items-center gap-3'>
            <Logo />
            {isExpanded && (
              <h1 className='font-semibold text-[#293F66] text-lg'>RoomE</h1>
            )}
          </div>
        </div>
        <MenuList isExpanded={isExpanded} />
      </aside>
      <SidebarToggle
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((prev) => !prev)}
      />
    </>
  );
};

export default Sidebar;
