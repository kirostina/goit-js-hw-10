import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_OwnHPJtyqZnhFGb9ke9rq5pe8KhPwuVuEnhtwXN0SzTtL91cpay6oQR0xNlIcWUE";

const API_KEY = 'live_OwnHPJtyqZnhFGb9ke9rq5pe8KhPwuVuEnhtwXN0SzTtL91cpay6oQR0xNlIcWUE';
const urlB = '/breeds';
const urlC = '/images';

const BASE_URL = "https://api.thecatapi.com/v1"

//Колекція порід

function fetchBreeds() {
    return fetch(`${BASE_URL}${urlB}?api_key=${API_KEY}`).then(responce => {
        if (!responce.ok) {
            throw new Error(responce.status);
        }
        return responce.json();
    })
};

//Інформація про кота

function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}${urlC}/${breedId}?api_key=${API_KEY}`).then(responce => {
        if (!responce.ok) {
            throw new Error(responce.status);
        }
        return responce.json();
    })
};

export {fetchBreeds, fetchCatByBreed};
