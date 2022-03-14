import {
  Container,
  Divider,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { home } from "./state";
import { Scrollable } from "/src/components/Scrollable";

export const BmsTableView = () => {
  const { devices } = useSnapshot(home);

  return (
    <Scrollable sx={{ ".os-scrollbar-vertical": { top: 62 } }}>
      <Container maxWidth="lg" disableGutters>
        <Divider
          sx={{
            position: "fixed",
            top: 48 + 56,
            left: 0,
            right: 0,
            background: (theme) => theme.palette.primary.main,
          }}
        />
        <Table
          stickyHeader
          sx={{
            "th, td": {
              border: "none",
              whiteSpace: "nowrap",
            },
            "tbody :is(th, td)": {
              py: 1,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell children="Device" />
              <TableCell children="State" />
              <TableCell align="right" children="SOC (%)" />
              <TableCell align="right" children="Temp. (°C)" />
              <TableCell align="right" children="Current (A)" />
              <TableCell align="right" children="MaxDevia. (mV)" />
              <TableCell align="right" children="Voltage (V)" />
              <TableCell align="right" children="Min. (V)" />
              <TableCell align="right" children="Max. (V)" />
            </TableRow>
          </TableHead>

          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell component="th">
                  <ListItemText
                    primary={device.name}
                    secondary={device.ipAddress}
                    primaryTypographyProps={{
                      noWrap: true,
                    }}
                  />
                </TableCell>
                <TableCell children={device.state} />
                <TableCell align="right" children={device.soc} />
                <TableCell align="right" children={device.temperature} />
                <TableCell align="right" children={device.current} />
                <TableCell align="right" children={device.maxDeviation} />
                <TableCell align="right" children={device.voltage} />
                <TableCell align="right" children={device.minVoltage} />
                <TableCell align="right" children={device.maxVoltage} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Scrollable>
  );
};
