import { Component } from 'react';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  // Создать обработчик change
  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  // Создать обработчик submit
  handleSubmit = event => {
    event.preventDefault();

    console.log('before update this.state.query: ', this.state.query);
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });

    console.log('after update this.state.query: ', this.state.query);
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.btn}>
            <span className={styles.btnLabel}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
