import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import autoAnimate from "@formkit/auto-animate";
import Waypoint from "../Waypoint";
import { waypointPropType } from "../../propTypes/commonPropTypes";
import styles from "./Waypoints.module.css";

const Waypoints = ({
  waypoints,
  hasWaypoints,
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
      {!hasWaypoints && (
        <div className={styles.noWayPoints}>
          <h3>Uh oh! It seems like you have no waypoints at the moment.</h3>
          <h4 className={styles.addWayPoints}>Click on the map to add some!</h4>
        </div>
      )}
      {!!hasWaypoints &&
        waypoints.features
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
  hasWaypoints: PropTypes.bool.isRequired,
  onDeleteWaypoint: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
};
