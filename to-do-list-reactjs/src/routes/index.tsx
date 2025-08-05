
import { BiRegistered } from 'react-icons/bi';
import AddTask from '../pages/AddTask';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyTasks from '../pages/MyTasks';
import Register from '../pages/Register';

import Tasks from '../pages/Tasks';
import UpdateTask from '../pages/UpdateTask';
import User from '../pages/User';
import { DesktopOutlined  ,EditOutlined,PlusOutlined,UserOutlined} from '@ant-design/icons';
import Role from '../pages/Role';

const routes = [
  {
    path: '/login',
    showOnMenu: false,
    isPublic: true,
     icon: <DesktopOutlined />,
    name: 'Login',
    index: true,
    element: <Login />,
  },
    {
    path: '/register',
    showOnMenu: false,
    isPublic: true,
     icon: <BiRegistered/>,
    name: 'Register',
    index: true,
    element: <Register />,
  },
  {
    path: '/home',
    showOnMenu: true,
    icon: <UserOutlined />,
    name: 'Home',
    index: true,
    element: <Home />,
    roles: ['Users', 'managers', 'Leaders'],
  },
  {
    path: '/tasks',
    showOnMenu: true,
     icon: <UserOutlined />,
    name: 'Tasks',
    index: true,
    element: <Tasks />,
    roles: ['Managers', 'Leaders','Users'],
  },

  {
    path: '/my-tasks',
    showOnMenu: true,
    icon: <UserOutlined />,
    name: 'My Tasks',
    index: true,
    element: <MyTasks />,
    roles: ['Managers', 'Leaders'],
    children: [
      {
        path: '/my-tasks/add',
        showOnMenu: true,
        name: 'Add Task',
        element: <AddTask />,
        icon: <PlusOutlined />,
        roles: ['Managers', 'Leaders'],
      },
      {
        path: '/my-tasks/update',
        showOnMenu: true,
        name: 'Update Task',
        element: <UpdateTask />,
        icon: <EditOutlined />,
        roles: ['Managers', 'Leaders'],
      }
    ],
  },
    {
    path: '/users',
    showOnMenu: true,
    icon: <UserOutlined />,
    name: 'Users',
    index: true,
    element: <User />,
    roles: ['Developer'],
  },
    {
    path: '/roles',
    showOnMenu: true,
    icon: <UserOutlined />,
    name: 'Roles',
    index: true,
    element: <Role/>,
    roles: ['Administrators', 'Managers'],
  },



  {
    path: '/security',
    showOnMenu: true,
   icon: <UserOutlined />,
    name: 'Security',
    index: true,
    element: <div>Security</div>,
    roles: ['Managers'],
  },
];
export default routes;