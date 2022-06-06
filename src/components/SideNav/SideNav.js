import PropTypes from "prop-types";
import styles from "./SideNav.module.css";

const SideNav = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const SideNavTop = ({ children }) => <div>{children}</div>;

const SideNavBottom = ({ children }) => (
  <div className={styles.downloadContainer}>{children}</div>
);

export default SideNav;

export { SideNavTop, SideNavBottom };

SideNav.propTypes = {
  children: PropTypes.node.isRequired,
};
SideNavTop.propTypes = {
  children: PropTypes.node.isRequired,
};
SideNavBottom.propTypes = {
  children: PropTypes.node.isRequired,
};
