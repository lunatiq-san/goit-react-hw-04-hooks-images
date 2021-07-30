import { Component } from 'react';
import './App.css';
import imagesApi from './components/services/images-api';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }

    if (prevState.currentPage > 2) {
      this.scrollWindow();
    }
  }

  handleGalleryItem = fullImageUrl => {
    this.setState({ largeImageURL: fullImageUrl, showModal: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" className="modalImage" />
          </Modal>
        )}
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <h1>Ooops... Something went wrong</h1>}
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
      </>
    );
  }
}

export default App;
