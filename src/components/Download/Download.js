import PropTypes from "prop-types";
import styles from "./Download.module.css";

const Download = ({ onDownload }) => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={onDownload}>
        Download your Route
      </button>
    </div>
  );
};

Download.propTypes = {
  onDownload: PropTypes.func.isRequired,
};

export default Download;
