import Layout from "./components/Layout";
import SideNav, { SideNavTop, SideNavBottom } from "./components/SideNav";
import Title from "./components/Title";
import Waypoints from "./components/Waypoints";
import Download from "./components/Download";

const waypoints = ["Waypoint 1", "Waypoint 2", "Waypoint 3", "Waypoint 4"];

const App = () => {
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
      <h2>Allo</h2>
    </Layout>
  );
};

export default App;
