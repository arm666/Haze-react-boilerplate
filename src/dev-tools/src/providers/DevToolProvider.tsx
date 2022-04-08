import React from 'react';
import { IDevData, IFixtureData } from '../types/dev-tools';
import tabsData from '../tabs';
import data from '../../../DevTools/fixtures/data.json';
import formData from '../../../DevTools/fixtures/form-data.json';
import { ITabComponent } from '../types/tabs';

const tabs: IDevData['tabs']['data'] = tabsData;
const DevToolContext: React.Context<IDevData> = React.createContext({
  tabs: {
    active: tabs[1],
    data: tabs,
  },
  data: data as IFixtureData,
  formData,
  minimize: false as boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTabClick: (activeTab: ITabComponent) => {},
  setDev: (() => {}) as React.Dispatch<React.SetStateAction<IDevData>>,
});

export const useDev = () => React.useContext(DevToolContext);

const DevToolProvider = ({ children }: { children: React.ReactNode }) => {
  const devData = useDev();
  const [dev, setDev] = React.useState<IDevData>(devData);

  const onTabClick = (activeTab: ITabComponent) => {
    setDev((dev) => ({
      ...dev,
      tabs: {
        ...dev.tabs,
        active: activeTab,
      },
    }));
  };

  const addCustomTabs = async () => {
    try {
      const tabs = await import(
        '../../../DevTools/tabs/custom-tabs.js' as string
      );
      if (tabs) {
        setDev((dev) => ({
          ...dev,
          tabs: {
            ...dev.tabs,
            data: [...dev.tabs.data, ...tabs.default],
          },
        }));
      }
    } catch (error) {
      // no custom tab file found
    }
  };

  React.useEffect(() => {
    const minimize = JSON.parse(localStorage.getItem('minimize') || 'false');
    setDev((dev) => ({ ...dev, minimize }));
  }, []);

  React.useEffect(() => {
    addCustomTabs();
    return () => {
      setDev(devData);
    };
  }, [devData]);

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
