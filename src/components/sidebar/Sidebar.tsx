import MenuList from './components/MenuList';
import SidebarToggle from './components/SidebarToggle';
import useLocalStorage from '@/hooks/useLocalStorage';

const SIDEBAR_STATE_KEY = 'sidebar-expanded';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useLocalStorage(SIDEBAR_STATE_KEY, true);

  return (
    <aside
      className={`h-screen bg-[#F9F9F9] transition-all duration-200 flex flex-col gap-4 py-4
        ${isExpanded ? 'w-52 items-start' : 'w-20 items-center'}
      `}>
      <SidebarToggle
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((prev) => !prev)}
      />
      <MenuList isExpanded={isExpanded} />
    </aside>
  );
};

export default Sidebar;
