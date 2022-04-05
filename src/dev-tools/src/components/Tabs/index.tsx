import React from 'react';
import { useDev } from '../../providers/DevToolProvider';
import { IDevData, IFixtureTabData } from '../../types/dev-tools';
import { ITab, ITabComponentList } from '../../types/tabs';
import styles from './tabs.module.scss';

interface ITabsHeaderProps {
  tabs: IDevData['tabs']['data'];
  active: IDevData['tabs']['active'];
  onTabClick: IDevData['onTabClick'];
}

interface IBody {
  activeTab: IDevData['tabs']['active'];
  components: ITabComponentList;
  className?: string;
}

const Tabs = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.tabs}>{children}</div>;
};

const Header = ({ tabs, active, onTabClick }: ITabsHeaderProps) => {
  return (
    <div className={styles.headers}>
      {tabs.map((tab: ITab) => (
        <div
          key={tab.path}
          className='tab'
          data-active={active.path === tab.path}
          onClick={() => onTabClick(tab)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

const Body = ({ activeTab, components, className }: IBody) => {
  const { data } = useDev();
  const Element = components.find((c) => c.path === activeTab.path)?.Element;
  const tabData = Object.getOwnPropertyDescriptor(data, activeTab.path)
    ?.value as IFixtureTabData;

  console.log({ data });

  return (
    <div className={`${styles.body} ${className}`}>
      {Boolean(tabData) && <Element tabData={tabData} />}
    </div>
  );
};

Tabs.Header = Header;
Tabs.Body = Body;

export default Tabs;
