import { appToast } from "../AppToast";
import { bluetooth, BluetoothError } from "/src/utils/bluetooth";

export const bluetoothStartScan = () => {
  bluetooth.startScan((error) => {
    if (error === BluetoothError.BLUETOOTH_NOT_FOUND) {
      appToast.open = true;
      appToast.severity = "error";
      appToast.children = "Bluetooth not available";
    }
  });
};
