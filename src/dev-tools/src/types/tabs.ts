export interface ITab {
  name: string;
  path: string;
}

export type ITabList = ITab[];

export interface ITabComponent {
  path: string;
  Element: any;
}

export type ITabComponentList = ITabComponent[];
