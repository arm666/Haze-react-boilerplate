import Docs from '../pages/Docs';
import Forms from '../pages/Forms';
import Login from '../pages/Login';
import Requests from '../pages/Request';
import { ITabComponentList } from '../types/tabs';

const tabs: ITabComponentList = [
  {
    path: 'login',
    name: 'Login',
    Component: Login,
  },
  {
    path: 'request',
    name: 'Request',
    Component: Requests,
  },

  {
    path: 'forms',
    name: 'Forms',
    Component: Forms,
  },
  {
    path: 'docs',
    name: 'Docs',
    Component: Docs,
  },
];

export default tabs;
