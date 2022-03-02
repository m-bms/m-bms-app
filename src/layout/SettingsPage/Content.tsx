import { Container, Divider, List } from "@mui/material";
import { AppGroup } from "./groups/AppGroup";
import { InfoGroup } from "./groups/InfoGroup";
import { SimulationGroup } from "./groups/SimulationGroup";
import { PageContent } from "/src/components/PageContent";

export const Content = () => {
  return (
    <PageContent>
      <Container maxWidth="sm" disableGutters>
        <List>
          <InfoGroup />
          <Divider />
          <AppGroup />
          <Divider />
          <SimulationGroup />
        </List>
      </Container>
    </PageContent>
  );
};
