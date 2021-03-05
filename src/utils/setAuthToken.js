import axios from 'axios';

// This utility will add the authorized user's JWT to the request header
// Any routes that are protected will require the JWT in order to access them.

const setAuthToken = (token) => {
<<<<<<< HEAD
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    console.log('the headers with axios from utils'
    console.log(axios.defaults.headers.common);
    // Add code here
  } else {
      delete axios.defaults.headers.common['Authorization']
  }
=======
    // Apply the token to request header
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        console.log('=====> HEADERS');
        console.log(axios.defaults.headers.common);
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
>>>>>>> upstream/main
}

export default setAuthToken;
