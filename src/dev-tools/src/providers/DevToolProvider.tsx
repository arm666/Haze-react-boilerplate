import React from 'react';
import { IDevData, IFixtureData } from '../types/dev-tools';
import { ITab } from '../types/tabs';
import tabsData from '../configs/tabs.json';
import fixturesData from '../../DevTools/fixtures/data.json';

const tabs: IDevData['tabs']['data'] = tabsData.tabs;
const DevToolContext: React.Context<IDevData> = React.createContext({
  tabs: {
    active: tabs[1],
    data: tabs,
  },
  data: fixturesData.tabs as IFixtureData,
  minimize: false as boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTabClick: (activeTab: ITab) => {},
  setDev: (() => {}) as React.Dispatch<React.SetStateAction<IDevData>>,
});

export const useDev = () => React.useContext(DevToolContext);

const DevToolProvider = ({ children }: { children: React.ReactNode }) => {
  const devData = useDev();
  const [dev, setDev] = React.useState<IDevData>(devData);

  const onTabClick = (activeTab: ITab) => {
    setDev((dev) => ({
      ...dev,
      tabs: {
        ...dev.tabs,
        active: activeTab,
      },
    }));
  };

  React.useEffect(() => {
    const minimize = JSON.parse(localStorage.getItem('minimize') || 'false');
    setDev((dev) => ({ ...dev, minimize }));
  }, []);

  return (
    <DevToolContext.Provider
      value={{
        ...dev,
        setDev,
        onTabClick,
      }}
    >
      {children}
    </DevToolContext.Provider>
  );
};

export default DevToolProvider;
