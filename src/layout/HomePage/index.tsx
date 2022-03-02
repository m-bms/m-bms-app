import { Content } from "./Content";
import { Header } from "./Header";
import { Page } from "/src/components/Page";

export const HomePage = () => {
  return (
    <Page in>
      <Header />
      <Content />
    </Page>
  );
};
