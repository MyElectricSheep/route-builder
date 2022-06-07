import styles from "./Title.module.css";

const Title = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Route Builder</h1>
      <hr className={styles.separator} />
    </div>
  );
};

export default Title;
