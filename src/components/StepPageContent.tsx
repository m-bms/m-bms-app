import {
  Box,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import IconCheckmark from "~icons/fluent/checkmark-24-regular?raw";
import IconDismiss from "~icons/fluent/dismiss-24-regular?raw";
import { Status } from "../utils/status";
import { Scrollable } from "./Scrollable";
import { SizeTracker } from "./SizeTracker";
import { UnpluginIcon } from "./UnpluginIcon";

export type ProgressListProps = {
  text?: string;
  length: number;
  getText(index: number): string;
  getStatus(index: number): Status;
};

export const ProgressList = ({
  text,
  length,
  getText,
  getStatus,
}: ProgressListProps) => {
  const tasks = useMemo(() => Array.from({ length }), [length]);

  return (
    <Stack height={1} maxHeight={1} px={2} overflow="hidden">
      <Box flex={2} py={1}>
        {text && (
          <Typography
            variant="body1"
            align="center"
            color="text.disabled"
            children={text}
          />
        )}
      </Box>

      <SizeTracker
        component={Container}
        props={{
          maxWidth: "xs",
          sx: {
            flex: 7,
            overflow: "hidden",
          },
        }}
      >
        {(height) => (
          <Paper variant="outlined" sx={{ maxHeight: height }}>
            <Scrollable sx={{ maxHeight: height }}>
              <List>
                {tasks.map((_, index) => (
                  <ListItem dense key={index} sx={{ overflow: "hidden" }}>
                    <ListItemText
                      primary={getText(index)}
                      primaryTypographyProps={{ noWrap: true }}
                    />

                    {getStatus(index) === Status.ACTIVE ? (
                      <CircularProgress size={20} sx={{ flex: "none" }} />
                    ) : getStatus(index) === Status.SUCCESSFUL ? (
                      <UnpluginIcon color="success" raw={IconCheckmark} />
                    ) : getStatus(index) === Status.FAILED ? (
                      <UnpluginIcon color="error" raw={IconDismiss} />
                    ) : null}
                  </ListItem>
                ))}
              </List>
            </Scrollable>
          </Paper>
        )}
      </SizeTracker>

      <Box flex={1} />
    </Stack>
  );
};
