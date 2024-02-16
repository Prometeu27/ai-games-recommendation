const axios = require('axios');

const url = "http://localhost:8000/recommend/";
const params = {
    genre: "['Shooter', 'Survival']"
};



axios.get(url, { params })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });