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
    <li className='flex items-center w-fit'>
      <NavLink to={path}>
        {({ isActive }) => (
          <div
            className={clsx(
              'flex items-center rounded-full bg-gray-100 overflow-hidden',
              isExpanded ? 'w-44 px-5 py-3' : 'w-12 px-3 py-3 justify-center',
              isActive
                ? 'bg-blue-100 text-[#293F66] font-semibold shadow-[0_0_6px_#4983EF]'
                : 'text-gray-700',
            )}>
            {React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              {
                className: `w-6 h-6 transition-colors flex-shrink-0 ${
                  isActive ? 'text-[#293F66]' : 'text-gray-400'
                }`,
              },
            )}
            <span
              className={clsx(
                'whitespace-nowrap transition-transform duration-200',
                isExpanded
                  ? 'opacity-100 translate-x-0 ml-4'
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
