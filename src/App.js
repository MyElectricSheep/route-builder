import { useState } from "react";
// import { nanoid } from "nanoid";

import Layout from "./components/Layout";
import SideNav, { SideNavTop, SideNavBottom } from "./components/SideNav";
import Title from "./components/Title";
import Waypoints from "./components/Waypoints";
import Download from "./components/Download";
import Map from "./components/Map";
import initialState from "./data/initialState";

import downloadGpx from "./utils/downloadGpx";

const App = () => {
  const [waypoints, setWaypoints] = useState(initialState);

  const refreshLines = () => {
    setWaypoints((prevWayPoints) => {
      const filteredWaypoints = prevWayPoints.features.filter(
        (f) => f.geometry.type !== "LineString"
      );
      return {
        ...prevWayPoints,
        features: [
          ...filteredWaypoints,
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: filteredWaypoints.map((w) => w.geometry.coordinates),
            },
            properties: {},
          },
        ],
      };
    });
  };

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
      refreshLines();
    }
  };

  const handleDeleteWaypoint = (id) => {
    // Remove the waypoint's marker from the DOM through the Mapbox instance
    waypoints.features
      .find((w) => w.properties.id === id)
      .properties.marker.remove();

    // Remove the waypoint from the state

    const filteredWaypoints = waypoints.features.filter(
      (f) => f.properties.id !== id
    );

    const newWayPoints = {
      ...waypoints,
      features: [...filteredWaypoints],
    };

    setWaypoints(newWayPoints);
    refreshLines();
  };

  const handleDownloadWaypoints = () => downloadGpx(waypoints);

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
          <Download onDownload={handleDownloadWaypoints} />
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
