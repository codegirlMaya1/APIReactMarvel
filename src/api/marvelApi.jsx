import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '873b1f26475c000e2ba08a5ec1a2e774';
const PRIVATE_KEY = 'fe3265bd8088738de372303135694bbaba873677';
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';

const getMarvelCharacters = async () => {
  const ts = new Date().getTime();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  const response = await axios.get(BASE_URL, {
    params: {
      ts,
      apikey: PUBLIC_KEY,
      hash,
    },
  });
  return response.data.data.results;
};

export default getMarvelCharacters;