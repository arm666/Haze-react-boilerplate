import { useDev } from './src/providers/DevToolProvider';
import Tabs from './src/components/Tabs';
import Login from './src/pages/Login';
import Request from './src/pages/Request';
import { ITabComponentList } from './src/types/tabs';
import Minimize from './src/components/Minimize';
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
        <Tabs>
          <Tabs.Header
            active={tabs.active}
            tabs={tabs.data}
            onTabClick={onTabClick}
          />

          <Tabs.Body activeTab={tabs.active} components={components} />
        </Tabs>
      )}
    </div>
  );
};

export default DevToolUI;
