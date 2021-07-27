import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ hits }) => (
  <>
    {hits.map(({ id, webformatURL, tags }) => (
      <li className={styles.item} key={id}>
        <img src={webformatURL} alt={tags} className={styles.image} />
      </li>
    ))}
  </>
);

export default ImageGalleryItem;
