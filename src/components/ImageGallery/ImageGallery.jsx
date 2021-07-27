import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ hits }) => (
  <ul className={styles.imageGallery}>
    <ImageGalleryItem hits={hits} />
  </ul>
);

export default ImageGallery;
