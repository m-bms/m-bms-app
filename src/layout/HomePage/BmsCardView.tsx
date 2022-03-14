import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSnapshot } from "valtio";
import IconBattery10 from "~icons/fluent/battery-10-24-regular?raw";
import IconMoreVertical from "~icons/fluent/more-vertical-24-regular?raw";
import { home } from "./state";
import { Scrollable } from "/src/components/Scrollable";
import { UnpluginIcon } from "/src/components/UnpluginIcon";

export const BmsCardView = () => {
  const { devices } = useSnapshot(home);

  return (
    <Scrollable
      sx={{
        background: (theme) =>
          theme.palette.mode === "dark" ? undefined : theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          {devices.map((device) => {
            return (
              <Grid key={device.id} item xs={12} sm={12} md={6} py={1}>
                <Card
                  sx={{
                    width: [1, 500, 400, 500],
                    m: "auto",
                    borderRadius: [0, 2],
                    boxShadow: "none",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar>
                        <UnpluginIcon raw={IconBattery10} />
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <UnpluginIcon raw={IconMoreVertical} />
                      </IconButton>
                    }
                    title={device.name}
                    subheader={device.ipAddress}
                  />

                  <CardContent sx={{ display: "flex" }}>
                    <DataSection
                      dataSet={[
                        { name: "State", value: device.state },
                        { name: "SOC", value: device.soc, unit: "%" },
                        {
                          name: "Temp.",
                          value: device.temperature,
                          unit: "°C",
                        },
                        { name: "Current", value: device.current, unit: "A" },
                      ]}
                    />

                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

                    <DataSection
                      dataSet={[
                        {
                          name: "MaxDevia.",
                          value: device.maxDeviation,
                          unit: "mv",
                        },
                        { name: "Voltage", value: device.voltage, unit: "V" },
                        { name: "Min.", value: device.minVoltage, unit: "V" },
                        { name: "Max.", value: device.maxVoltage, unit: "V" },
                      ]}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Scrollable>
  );
};

const DataSection = (props: {
  dataSet: {
    name: string;
    value: string | number;
    unit?: string;
  }[];
}) => {
  return (
    <Stack flex={1} overflow="hidden">
      {props.dataSet.map((data) => (
        <Stack key={data.name} direction="row">
          <Typography
            variant="body2"
            mr={1}
            noWrap
            color="text.disabled"
            children={data.name}
          />

          <Box flex={1} />

          <Typography
            variant="body2"
            fontFamily="Roboto Mono"
            children={data.value}
          />

          {data.unit && (
            <Typography
              variant="body2"
              whiteSpace="pre"
              fontFamily="Roboto Mono"
              color="text.disabled"
              children={data.unit.padStart(2, " ")}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
};
