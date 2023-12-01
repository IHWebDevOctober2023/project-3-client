// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

// Configuring of USER - uploadUserImage
const uploadUserImage = (file) => {
  return api.post("/uploaduserpicture", file)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  uploadUserImage
};
