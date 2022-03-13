import { Status } from "../status";

export type BlueToothDevice = {
  id: string;
  name: string;
  bms: boolean;
};

export type BmsDevice = {
  id: string;
  ipAddress: string;
  name: string;
  soc: number;
  packVoltage: number;
  minCellVoltage: number;
  maxCellVoltage: number;
  temperature: number;
  status: Status;
};
