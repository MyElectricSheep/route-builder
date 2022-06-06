// import PropTypes from "prop-types";
import styles from "./Download.module.css";

const Download = () => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.button}>
        Download your Route
      </button>
    </div>
  );
};

Download.propTypes = {};

export default Download;
