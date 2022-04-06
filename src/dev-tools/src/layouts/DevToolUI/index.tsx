import { useDev } from '../../providers/DevToolProvider';
import Tabs from '../../components/Tabs';
import Login from '../../pages/Login';
import Request from '../../pages/Request';
import Forms from '../../pages/Forms';
import { ITabComponentList } from '../../types/tabs';
import Minimize from '../../components/Minimize';
import styles from './dev-tool.module.scss';

const components: ITabComponentList = [
  {
    path: 'login',
    Element: Login,
  },
  {
    path: 'request',
    Element: Request,
  },

  {
    path: 'forms',
    Element: Forms,
  },
];

const DevToolUI = () => {
  const { tabs, onTabClick, minimize } = useDev();

  return (
    <div
      className={styles.container}
      data-minimize={minimize ? 'minimize' : 'not-minimize'}
    >
      <div>
        <Minimize />
      </div>
      {!minimize && (
        <div className={styles.innerContainer}>
          <Tabs>
            <Tabs.Header
              active={tabs.active}
              tabs={tabs.data}
              onTabClick={onTabClick}
            />

            <Tabs.Body activeTab={tabs.active} components={components} />
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DevToolUI;
