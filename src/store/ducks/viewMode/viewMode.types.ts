// data types
export enum ViewType {
  day = "day",
  month = "month",
}

export interface IViewMode {
  type: ViewType;
}

// state type
export interface IViewModeState {
  data: IViewMode;
}