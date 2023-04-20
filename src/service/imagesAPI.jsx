import axios from 'axios';

const API_KEY = '34827086-10493c8e3456fbc81c5176912';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (inputData, pageNr) => {
  const { data } = await axios.get(
    `?q=${inputData}&page=${pageNr}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12` );

  return data;
};
