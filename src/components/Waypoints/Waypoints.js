import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import autoAnimate from "@formkit/auto-animate";
import Waypoint from "../Waypoint";
import { waypointPropType } from "../../propTypes/commonPropTypes";
import styles from "./Waypoints.module.css";

const Waypoints = ({
  waypoints,
  onDeleteWaypoint,
  onDragStart,
  onDragEnter,
}) => {
  const parent = useRef(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration: 400,
        easing: "ease-in-out",
      });
    }
  }, [parent]);

  return (
    <div className={styles.container} ref={parent}>
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
