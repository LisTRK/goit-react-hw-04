import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/';
const KEY_ID = 'vjHfDE76FeIhuIX3zevKhafLGttaD44VQQGL6k3ZfzE';

export async function fetchImages(query, page) {
  const response = await axios(BASE_URL + 'search/photos/', {
    params: { client_id: KEY_ID, query: query, page: page },
  });
  return response.data;
}
