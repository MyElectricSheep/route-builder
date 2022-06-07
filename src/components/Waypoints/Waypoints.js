import PropTypes from "prop-types";
import Waypoint from "../Waypoint";
import { waypointPropType } from "../../propTypes/commonPropTypes";
import styles from "./Waypoints.module.css";

const Waypoints = ({
  waypoints,
  onDeleteWaypoint,
  onDragStart,
  onDragEnter,
}) => {
  return (
    <div className={styles.container}>
      {waypoints.features
        .filter((f) => f.geometry.type === "Point")
        .map((waypoint, index) => {
          return (
            <Waypoint
              key={`${waypoint.properties.title}${waypoint.properties.id}`}
              waypoint={waypoint}
              onDeleteWaypoint={onDeleteWaypoint}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              index={index}
            />
          );
        })}
    </div>
  );
};

export default Waypoints;

Waypoints.propTypes = {
  waypoints: waypointPropType.isRequired,
  onDeleteWaypoint: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
};
