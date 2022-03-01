import { BleDevice } from "@capacitor-community/bluetooth-le";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import { ref } from "valtio";
import { appDialog } from "../AppDialog";
import { appToast } from "../AppToast";
import { bluetooth, BluetoothResponse } from "/src/utils/bluetooth";
import { wifi } from "/src/utils/wifi";

export const bluetoothStartScan = () => {
  bluetooth.startScan((error) => {
    if (error === BluetoothResponse.BLUETOOTH_NOT_FOUND) {
      appToast.open = true;
      appToast.severity = "error";
      appToast.children = "Bluetooth not available";
    }
  });
};

export const bluetoothConnect = (device: BleDevice) => {
  bluetooth.stopScan();

  appDialog.open = true;
  appDialog.onClose = bluetooth.stopConnect;
  appDialog.children = ref(
    <>
      <DialogTitle children="Connecting to device" />
      <DialogContent children={<LinearProgress />} />
      <DialogActions>
        <Button
          children="Cancel"
          onClick={() => {
            bluetooth.stopConnect();
            appDialog.open = false;
          }}
        />
      </DialogActions>
    </>
  );

  bluetooth.connect(device, (error) => {
    if (error) {
      appToast.open = true;
      appToast.severity = "error";
      appToast.children = "Unable to connect to device";
      appDialog.open = false;
    } else {
      wifiScan();
    }
  });
};

export const wifiScan = () => {
  appDialog.open = true;
  appDialog.onClose = wifi.reset;
  appDialog.children = ref(
    <>
      <DialogTitle children="Scanning networks" />
      <DialogContent children={<LinearProgress />} />
      <DialogActions>
        <Button
          children="Cancel"
          onClick={() => {
            wifi.reset();
            appDialog.open = false;
          }}
        />
      </DialogActions>
    </>
  );

  wifi.startScan(wifiJoin);
};

export const wifiJoin = () => {
  appDialog.open = true;
  appDialog.onClose = wifi.reset;
  appDialog.children = ref(
    <>
      <DialogTitle children="Select Network" />

      <DialogContent sx={{ px: 0 }}>
        <List sx={{ maxHeight: "40vh", overflow: "auto" }}>
          {wifi.scanResults.map((device) => (
            <ListItem key={device.mac}>
              <ListItemText
                primary={`${device.connected ? "(current) " : ""}${
                  device.ssid
                }`}
                primaryTypographyProps={{
                  noWrap: true,
                  sx: { mr: "60px" },
                }}
              />

              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" children="Join" />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button
          children="Cancel"
          onClick={() => {
            wifi.reset();
            appDialog.open = false;
          }}
        />
        <Button children="Custom Network" onClick={wifiJoinCustom} />
      </DialogActions>
    </>
  );
};

export const wifiJoinCustom = () => {
  appDialog.open = true;
  appDialog.onClose = wifi.reset;
  appDialog.children = ref(
    <>
      <DialogTitle children="Custom Network" />

      <DialogContent>
        <TextField label="SSID" variant="standard" fullWidth />
        <TextField label="Password" variant="standard" fullWidth />
      </DialogContent>

      <DialogActions>
        <Button
          children="Cancel"
          onClick={() => {
            wifi.reset();
            appDialog.open = false;
          }}
        />
        <Button children="Custom network" />
      </DialogActions>
    </>
  );
};
