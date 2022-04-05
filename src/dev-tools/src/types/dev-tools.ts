import { Requests } from './requests';
import { ITab } from './tabs';

export interface IApi {
  method: Requests;
  path: string;
  default: boolean;
}

export interface IFixtureTabData {
  api: IApi[];
  data: any;
}

export interface IFixtureData {
  login: IFixtureTabData;
}

export interface IDevData {
  tabs: {
    active: ITab;
    data: ITab[];
  };
  onTabClick: (activeTab: ITab) => void;
  data: IFixtureData;
  minimize: boolean;
  setDev: React.Dispatch<React.SetStateAction<IDevData>>;
}
