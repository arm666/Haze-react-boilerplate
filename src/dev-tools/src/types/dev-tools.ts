import { Requests } from './requests';
import { ITabComponent } from './tabs';

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
    active: ITabComponent;
    data: ITabComponent[];
  };
  formData: any;
  onTabClick: (activeTab: ITabComponent) => void;
  data: IFixtureData;
  minimize: boolean;
  setDev: React.Dispatch<React.SetStateAction<IDevData>>;
}
