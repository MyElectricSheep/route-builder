import { useState, useRef } from "react";

import Layout from "./components/Layout";
import SideNav, { SideNavTop, SideNavBottom } from "./components/SideNav";
import Title from "./components/Title";
import Waypoints from "./components/Waypoints";
import Download from "./components/Download";
import Map from "./components/Map";
import seedData from "./data/seedData";

import {
  handleAddWaypoint,
  handleDeleteWaypoint,
  refreshLines,
} from "./utils/waypointsAndLines";
import { handleDragStart, handleDragEnter } from "./utils/dragAndDrop";
import downloadGpx from "./utils/downloadGpx";

const { state, lng, lat, zoom } = seedData();

const App = () => {
  const [waypoints, setWaypoints] = useState(state);
  const draggedWaypoint = useRef();
  const dragOverWaypoint = useRef();
  const idCounter = useRef(waypoints.features.length);

  const hasWaypoints = waypoints.features.filter(
    (f) => f.geometry.type === "Point"
  ).length;

  return (
    <Layout>
      <SideNav>
        <SideNavTop>
          <Title />
          <Waypoints
            waypoints={waypoints}
            hasWaypoints={hasWaypoints}
            onDeleteWaypoint={(id) =>
              handleDeleteWaypoint(id, waypoints, setWaypoints, refreshLines)
            }
            onDragStart={(position) =>
              handleDragStart(draggedWaypoint, position)
            }
            onDragEnter={(e, position) =>
              handleDragEnter(
                e,
                position,
                draggedWaypoint,
                dragOverWaypoint,
                waypoints,
                setWaypoints,
                refreshLines
              )
            }
          />
        </SideNavTop>
        <SideNavBottom hasWaypoints={hasWaypoints}>
          <Download onDownload={() => downloadGpx(waypoints)} />
        </SideNavBottom>
      </SideNav>
      <Map
        waypoints={waypoints}
        onAddWaypoint={(e) =>
          handleAddWaypoint(e, setWaypoints, idCounter, refreshLines)
        }
        setWaypoints={setWaypoints}
        lng={lng}
        lat={lat}
        zoom={zoom}
      />
    </Layout>
  );
};

export default App;
