import { useState, useRef } from "react";
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
  const draggedWaypoint = useRef();
  const dragOverWaypoint = useRef();

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

  const handleDragStart = (position) => {
    draggedWaypoint.current = position;
  };

  const handleDragEnter = (e, position) => {
    if (e.target.tagName === "path" || e.target.tagName === "svg") {
      return;
    }

    dragOverWaypoint.current = position;

    const waypointsCopy = [
      ...waypoints.features.filter((f) => f.geometry.type === "Point"),
    ];

    const draggedWaypointContent = waypointsCopy[draggedWaypoint.current];

    waypointsCopy.splice(draggedWaypoint.current, 1);
    waypointsCopy.splice(dragOverWaypoint.current, 0, draggedWaypointContent);

    draggedWaypoint.current = dragOverWaypoint.current;
    dragOverWaypoint.current = null;

    setWaypoints((prevWayPoints) => ({
      ...prevWayPoints,
      features: waypointsCopy,
    }));

    refreshLines();
  };

  return (
    <Layout>
      <SideNav>
        <SideNavTop>
          <Title />
          <Waypoints
            waypoints={waypoints}
            onDeleteWaypoint={handleDeleteWaypoint}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
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
