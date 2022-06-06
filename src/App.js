import { useState } from "react";
import Layout from "./components/Layout";
import SideNav, { SideNavTop, SideNavBottom } from "./components/SideNav";
import Title from "./components/Title";
import Waypoints from "./components/Waypoints";
import Download from "./components/Download";
import Map from "./components/Map";
import initialState from "./data/initialState";

const App = () => {
  const [waypoints] = useState(initialState);

  return (
    <Layout>
      <SideNav>
        <SideNavTop>
          <Title />
          <Waypoints waypoints={waypoints} />
        </SideNavTop>
        <SideNavBottom>
          <Download />
        </SideNavBottom>
      </SideNav>
      <Map waypoints={waypoints} />
    </Layout>
  );
};

export default App;
