import PropTypes from "prop-types";
import Waypoint from "../Waypoint";
import styles from "./Waypoints.module.css";

const Waypoints = ({ waypoints, onDeleteWaypoint }) => {
  return (
    <div className={styles.container}>
      {waypoints.features.map((waypoint) => {
        return (
          <Waypoint
            key={`${waypoint.properties.title}${waypoint.properties.id}`}
            waypoint={waypoint}
            onDeleteWaypoint={onDeleteWaypoint}
          />
        );
      })}
    </div>
  );
};

export default Waypoints;

Waypoints.propTypes = {
  waypoints: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        geometry: PropTypes.shape({
          type: PropTypes.string,
          coordinates: PropTypes.arrayOf(PropTypes.number),
        }),
        properties: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          description: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  onDeleteWaypoint: PropTypes.func.isRequired,
};
