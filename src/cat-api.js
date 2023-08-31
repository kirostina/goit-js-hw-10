import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_OwnHPJtyqZnhFGb9ke9rq5pe8KhPwuVuEnhtwXN0SzTtL91cpay6oQR0xNlIcWUE";

const api_key = 'live_OwnHPJtyqZnhFGb9ke9rq5pe8KhPwuVuEnhtwXN0SzTtL91cpay6oQR0xNlIcWUE';
const urlB = 'https://api.thecatapi.com/v1/breeds';
const urlC = 'https://api.thecatapi.com/v1/images';

//Колекція порід

function fetchBreeds() {
    return fetch(`${urlB}?api_key=${api_key}`).then(responce => {
        if (!responce.ok) {
            throw new Error(responce.status);
        }
        return responce.json();
    })
};

//Інформація про кота

function fetchCatByBreed(breedId) {
    return fetch(`${urlC}/${breedId}?api_key=${api_key}`).then(responce => {
        if (!responce.ok) {
            throw new Error(responce.status);
        }
        return responce.json();
    })
};

export {fetchBreeds, fetchCatByBreed};
