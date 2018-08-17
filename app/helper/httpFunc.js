import fetch from 'node-fetch';

const httpGet = url => fetch(url)
  .then(res => res.json())
  .then(json => json);

export default {
  httpGet,
};
