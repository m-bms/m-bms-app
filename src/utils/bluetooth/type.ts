import { Status } from "../status";

export type BlueToothDevice = {
  id: string;
  name: string;
  bms: boolean;
  connecting: Status;
  joining: Status;
  selected?: boolean;
  toggleSelected(): unknown;
  connect(unmounted: () => boolean): unknown;
};

export const enum BluetoothError {
  INTERRUPTED = "interrupted",
  NO_ERRORS = "no-errors",
  NO_HARDWARE = "no-hardware",
  SCAN_FAILED = "scan-failed",
  NO_DEVICES = "no-devices",
  CONNECT_FAILED = "connect-failed",
}
