import PropTypes from "prop-types";
import Waypoint from "../Waypoint";
import styles from "./Waypoints.module.css";

const Waypoints = ({ waypoints }) => {
  return (
    <div className={styles.container}>
      {waypoints.map((waypoint) => {
        return <Waypoint key={waypoint} waypoint={waypoint} />;
      })}
    </div>
  );
};

export default Waypoints;

Waypoints.propTypes = {
  waypoints: PropTypes.arrayOf(PropTypes.string).isRequired,
};
