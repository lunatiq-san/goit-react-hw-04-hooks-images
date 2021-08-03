import { useState, useEffect } from 'react';
import './App.css';
import imagesApi from './components/services/images-api';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchImages();
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 2) {
      scrollWindow();
    }
  }, [currentPage]);

  const fetchImages = () => {
    const options = { searchQuery, currentPage };

    setLoading(true);

    imagesApi
      .fetchImages(options)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images]);
        setCurrentPage(currentPage + 1);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGalleryItem = fullImageUrl => {
    setLargeImageURL(fullImageUrl);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" className="modalImage" />
        </Modal>
      )}
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h1>Ooops... Something went wrong</h1>}
      {isLoading && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={50}
          width={50}
          className="loader"
        />
      )}
      <ImageGallery images={images} onImageClick={handleGalleryItem} />
      {shouldRenderLoadMoreButton && <Button onClick={fetchImages} />}
    </>
  );
}

export default App;
