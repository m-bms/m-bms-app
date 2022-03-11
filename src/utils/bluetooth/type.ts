export type BlueToothDevice = {
  id: string;
  name: string;
  bms: boolean;
};

export const enum BluetoothError {
  NO_ERRORS = "no-errors",
  INTERRUPTED = "interrupted",
  NO_HARDWARE = "no-hardware",
  SCAN_FAILED = "scan-failed",
  NO_DEVICES = "no-devices",
  CONNECT_FAILED = "connect-failed",
}
