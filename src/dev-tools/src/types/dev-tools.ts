import { Requests } from './requests';
import { ITab } from './tabs';

export interface IApi {
  method: Requests;
  path: string;
  default: boolean;
}

export interface IFixtureData {
  login: {
    method: string;
    path: string;
    data: {
      username: string;
      password: string;
    };
  };
}

export interface IDevData {
  tabs: {
    active: ITab;
    data: ITab[];
  };
  formData: any;
  onTabClick: (activeTab: ITab) => void;
  data: IFixtureData;
  minimize: boolean;
  setDev: React.Dispatch<React.SetStateAction<IDevData>>;
}
