import axios from 'axios'

export const questionApi =  axios.create({
    baseURL:'https://codempire-test-app-db.firebaseio.com/questions.json'
});

