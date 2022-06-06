import PropTypes from "prop-types";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";
import { RiDeleteBin7Fill as BinIcon } from "react-icons/ri";
import styles from "./Waypoint.module.css";

const Waypoint = ({ waypoint }) => {
  return (
    <div className={styles.container}>
      <div className={styles.handleContainer}>
        <HamburgerIcon className={styles.hamburger} />
        <h3 className={styles.waypointDesc}>{waypoint}</h3>
      </div>
      <BinIcon className={styles.bin} />
    </div>
  );
};

export default Waypoint;

Waypoint.propTypes = {
  waypoint: PropTypes.string.isRequired,
};
