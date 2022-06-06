import { useState } from "react";
// import { nanoid } from "nanoid";
import Layout from "./components/Layout";
import SideNav, { SideNavTop, SideNavBottom } from "./components/SideNav";
import Title from "./components/Title";
import Waypoints from "./components/Waypoints";
import Download from "./components/Download";
import Map from "./components/Map";
import initialState from "./data/initialState";

const App = () => {
  const [waypoints, setWaypoints] = useState(initialState);

  const handleAddWaypoint = (e) => {
    const newWayPoint = {
      type: "Feature",
      geometry: {
        type: "Point",
      },
      properties: {
        title: "Waypoint",
        description: "Some description",
      },
    };

    if (e.type === "click") {
      setWaypoints((prevWayPoints) => {
        newWayPoint.geometry.coordinates = [e.lngLat.lng, e.lngLat.lat];
        newWayPoint.properties.id = prevWayPoints.features.length + 1;
        // newWayPoint.properties.id = nanoid();
        return {
          ...prevWayPoints,
          features: [...prevWayPoints.features, newWayPoint],
        };
      });
    }
  };

  const handleDeleteWaypoint = (id) => {
    // Remove the waypoint's marker from the DOM through the Mapbox instance
    waypoints.features
      .find((w) => w.properties.id === id)
      .properties.marker.remove();

    // Remove the waypoint from the state
    setWaypoints({
      ...waypoints,
      features: waypoints.features.filter((w) => w.properties.id !== id),
    });
  };

  return (
    <Layout>
      <SideNav>
        <SideNavTop>
          <Title />
          <Waypoints
            waypoints={waypoints}
            onDeleteWaypoint={handleDeleteWaypoint}
          />
        </SideNavTop>
        <SideNavBottom>
          <Download />
        </SideNavBottom>
      </SideNav>
      <Map
        waypoints={waypoints}
        onAddWaypoint={handleAddWaypoint}
        setWaypoints={setWaypoints}
      />
    </Layout>
  );
};

export default App;
