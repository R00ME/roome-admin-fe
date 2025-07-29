import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import React from 'react';
import clsx from 'clsx';

const MenuListItem = ({
  isExpanded,
  icon,
  menuName,
  path,
}: {
  isExpanded: boolean;
  icon: ReactNode;
  menuName: string;
  path: string;
}) => {
  return (
    <li className='flex items-center w-fit select-none drag-none'>
      <NavLink to={path}>
        {({ isActive }) => (
          <div
            className={clsx(
              'flex items-center overflow-hidden select-none [&_*]:select-none [&_*]:-webkit-user-drag-none',
              isExpanded ? 'w-44 pl-5 pr-3 pt-3 pb-2.5 rounded-lg' : 'pt-2.5 pb-1.5 pr-1.5 pl-2.5 justify-center rounded-full',
              isActive
                ? 'bg-[#0083FF] text-white'
                : 'text-gray-700',
            )}>
            {React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: `w-6 h-6 transition-colors flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`,
              },
            )}
            <span
              className={clsx(
                'whitespace-nowrap transition-transform duration-200 text-sm pb-1',
                isExpanded
                  ? 'opacity-100 translate-x-0 ml-6'
                  : 'opacity-0 -translate-x-4 absolute left-0',
              )}>
              {menuName}
            </span>
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default MenuListItem;
