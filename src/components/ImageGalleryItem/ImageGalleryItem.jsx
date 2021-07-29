import styles from './ImageGalleryItem.module.css';

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const fullImageUrl = () => onImageClick(image.largeImageURL);

  return (
    <li className={styles.item}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles.image}
        onClick={fullImageUrl}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  tags: '',
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
