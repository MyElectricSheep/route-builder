import PropTypes from "prop-types";
import { GiHamburgerMenu as HamburgerIcon } from "react-icons/gi";
import { RiDeleteBin7Fill as BinIcon } from "react-icons/ri";
import styles from "./Waypoint.module.css";

const Waypoint = ({ waypoint }) => {
  return (
    <div className={styles.container}>
      <div className={styles.handleContainer}>
        <HamburgerIcon className={styles.hamburger} />
        <h3 className={styles.title}>
          {waypoint.properties.title}
          <span className={styles.id}>{waypoint.properties.id}</span>
        </h3>
      </div>
      <BinIcon className={styles.bin} />
    </div>
  );
};

export default Waypoint;

Waypoint.propTypes = {
  waypoint: PropTypes.shape({
    geometry: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    properties: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};
