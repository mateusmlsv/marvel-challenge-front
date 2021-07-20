import axios from 'axios'

export const marvel = axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public/'
})