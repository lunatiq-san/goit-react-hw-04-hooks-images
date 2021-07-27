import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21837962-4cd9da589d4f9b46acd6bb393';

const fetchHits = ({ searchQuery = '', currentPage = 1, perPage = 12 }) => {
  return axios
    .get(
      `${BASE_URL}/?q=${searchQuery}&page=${currentPage}&per_page=${perPage}&key=${API_KEY}&image_type=photo&orientation=horizontal`,
    )
    .then(response => response.data.hits);
};

export default { fetchHits };
