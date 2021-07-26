import styles from './ImageGallery.module.css';

const ImageGallery = ({ hits }) => (
  <ul className={styles.imageGallery}>
    {hits.map(({ id, webformatURL, tags }) => (
      <li key={id}>
        <img src={webformatURL} alt={tags} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
