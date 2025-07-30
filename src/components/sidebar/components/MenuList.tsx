import MenuListItem from './MenuListItem';
import ServiceAnalysisIcon from '@/assets/icons/sidebar/system-analysist-icon.svg?react';
import UserAnalysisIcon from '@/assets/icons/sidebar/user-analysist-icon.svg?react';
import UserManagementIcon from '@/assets/icons/sidebar/system-icon.svg?react';
import ManagementEventIcon from '@/assets/icons/sidebar/event-icon.svg?react';
import AdminInviteIcon from '@/assets/icons/sidebar/admin-invite-icon.svg?react';

const MenuList = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <ul className='flex flex-col mt-3 gap-2 px-4 w-fit'>
      <MenuListItem
        isExpanded={isExpanded}
        icon={<ServiceAnalysisIcon className='w-6 h-6 transition-colors' />}
        menuName='서비스 분석'
        path='/dashboard/service'
      />
      <MenuListItem
        isExpanded={isExpanded}
        icon={<UserAnalysisIcon className='w-6 h-6 transition-colors' />}
        menuName='사용자 분석'
        path='/dashboard/user'
      />
      <MenuListItem
        isExpanded={isExpanded}
        icon={<UserManagementIcon className='w-6 h-6 transition-colors' />}
        menuName='운영 시스템'
        path='/dashboard/system'
      />
      <hr className='w-full border-t border-gray-200' />
      <MenuListItem
        isExpanded={isExpanded}
        icon={<ManagementEventIcon className='w-6 h-6 transition-colors' />}
        menuName='이벤트 관리'
        path='/events'
      />
      <MenuListItem
        isExpanded={isExpanded}
        icon={<AdminInviteIcon className='w-6 h-6 transition-colors' />}
        menuName='운영자 관리'
        path='/admins'
      />
    </ul>
  );
};

export default MenuList;
