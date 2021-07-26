import { Component } from 'react';
import axios from 'axios';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

// Добавить в state текущую страницу
class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
  };

  // Запрос происходит при сабмите формы
  onChangeQuery = query => {
    const { currentPage } = this.state;

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&image_type=photo&orientation=horizontal&per_page=2&page=${currentPage}&key=21837962-4cd9da589d4f9b46acd6bb393`,
      )
      .then(response => {
        this.setState({ hits: response.data.hits });
      });
  };

  render() {
    const { hits } = this.state;
    // Получить картинки, отрисовать на странице
    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery hits={hits} />
      </>
    );
  }
}

export default App;
