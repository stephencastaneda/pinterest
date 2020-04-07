import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsById = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const myPins = response.data;
      const pins = [];
      Object.keys(myPins).forEach((pinId) => {
        myPins[pinId].id = pinId;
        pins.push(myPins[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});

export default { getPinsById };