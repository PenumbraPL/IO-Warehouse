import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import { SvgIcon } from '@mui/material';
import CalendarIcon from '@heroicons/react/24/solid/CalendarDaysIcon';
import FormIcon from '@heroicons/react/24/solid/DocumentArrowUpIcon';


export const items = [
  {
    title: 'Overview',
    path: '/admin',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Calendar',
    path: '/admin/calendar',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Employees',
    path: '/admin/employees',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Employees Applications',
    path: '/admin/empl_app',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Account',
  //   path: '/account',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
];
