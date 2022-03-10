import { Box, Container, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Page, PageProps } from "./Page";
import { Scrollable } from "./Scrollable";

export type StepPageProps = PageProps & {
  headerText: string;
  headerDivider?: boolean;
  headerEnd?: ReactNode;
};

export const StepPage = (props: StepPageProps) => {
  return (
    <Page {...props}>
      <Stack height={1}>
        <Box
          flex={1}
          py={1}
          borderBottom={(theme) =>
            props.headerDivider
              ? `1px solid ${theme.palette.primary.main}`
              : "none"
          }
        >
          <Container
            maxWidth="sm"
            disableGutters
            sx={{
              height: 1,
              display: "flex",
              alignItems: "end",
            }}
          >
            <Box flex={1} />

            <Typography
              display="flex"
              justifyContent="center"
              alignItems="end"
              variant="h5"
              children={props.headerText}
            />

            <Box flex={1} position="relative" children={props.headerEnd} />
          </Container>
        </Box>
        <Box flex={8}>
          <Scrollable>
            <Container
              maxWidth="sm"
              disableGutters
              sx={{
                height: "1px",
                minHeight: 1,
              }}
              children={props.children}
            />
          </Scrollable>
        </Box>
        <Box flex={1} />
      </Stack>
    </Page>
  );
};
