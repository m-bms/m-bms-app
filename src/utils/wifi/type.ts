export type WifiNetwork = {
  ssid: string;
  mac: string;
  current?: boolean;
};

export enum WifiError {
  INTERRUPTED = "interrupted",
  NO_ERRORS = "no-errors",
  NO_HARDWARE = "no-hardware",
  NO_NETWORKS = "no-networks",
  SCAN_FAILED = "scan-failed",
}
