import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsById = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const myPins = response.data;
      const pins = [];
      if (myPins) {
        Object.keys(myPins).forEach((pinId) => {
          myPins[pinId].id = pinId;
          pins.push(myPins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const myPins = response.data;
      const pins = [];
      if (myPins) {
        Object.keys(myPins).forEach((pinId) => {
          myPins[pinId].id = pinId;
          pins.push(myPins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const updatePin = (pinId, updatedPin) => axios.patch(`${baseUrl}/pins/${pinId}.json`, updatedPin);

export default {
  getPinsById,
  deletePin,
  addPin,
  getSinglePin,
  updatePin,
  getPinsByBoardId,
};
