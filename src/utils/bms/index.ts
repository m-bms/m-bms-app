import { rand, randFloat, randIp, randMac, randVehicle } from "@ngneat/falso";

export type BmsDevice = {
  id: string;
  name: string;
  ipAddress: string;
  soc: number;
  temperature: number;
  current: number;
  state: string;
  maxDeviation: number;
  voltage: number;
  minVoltage: number;
  maxVoltage: number;
};

export const createBmsDevice = (name?: string): BmsDevice => ({
  id: randMac(),
  name: name ?? randVehicle(),
  ipAddress: randIp(),
  soc: randFloat({ min: 0, max: 100, fraction: 3 }),
  temperature: randFloat({ min: 0, max: 100, fraction: 3 }),
  current: randFloat({ min: 0, max: 100, fraction: 3 }),
  state: rand(["Charging", "Discharg."]),
  maxDeviation: randFloat({ min: 0, max: 100, fraction: 3 }),
  voltage: randFloat({ min: 0, max: 100, fraction: 3 }),
  minVoltage: randFloat({ min: 0, max: 100, fraction: 3 }),
  maxVoltage: randFloat({ min: 0, max: 100, fraction: 3 }),
});
