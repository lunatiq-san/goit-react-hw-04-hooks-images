import { Component } from 'react';
import './App.css';
import imagesApi from './components/services/images-api';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import LoadMoreButton from './components/Button';

class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchHits = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi
      .fetchHits(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.scrollWindow();
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
    const { hits, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <h1>Ooops... Something went wrong</h1>}
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        <ImageGallery hits={hits} />
        {shouldRenderLoadMoreButton && (
          <LoadMoreButton onClick={this.fetchHits} />
          // <button type="button" onClick={this.fetchHits}>
          //   Load more
          // </button>
        )}
      </>
    );
  }
}

export default App;
