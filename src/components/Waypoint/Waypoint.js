import PropTypes from "prop-types";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";
import { RiDeleteBin7Fill as BinIcon } from "react-icons/ri";
import { waypointPropType } from "../../propTypes/commonPropTypes";
import styles from "./Waypoint.module.css";

const Waypoint = ({
  waypoint,
  onDeleteWaypoint,
  onDragStart,
  onDragEnter,
  index,
}) => {
  return (
    <div
      className={styles.container}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart(index);
      }}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles.handleContainer}>
        <HamburgerIcon className={styles.hamburger} />
        <h3 className={styles.title}>
          {waypoint.properties.title}
          <span className={styles.id}>{waypoint.properties.id}</span>
        </h3>
      </div>
      <BinIcon
        className={styles.bin}
        onClick={() => onDeleteWaypoint(waypoint.properties.id)}
      />
    </div>
  );
};

export default Waypoint;

Waypoint.propTypes = {
  waypoint: waypointPropType.isRequired,
  onDeleteWaypoint: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
