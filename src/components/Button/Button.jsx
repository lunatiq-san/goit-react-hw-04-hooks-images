import styles from './Button.module.css';

const LoadMoreButton = ({ onClick }) => (
  <button className={styles.btn} type="button" onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreButton;
