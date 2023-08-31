import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
axios.defaults.headers.common["x-api-key"] = "live_OwnHPJtyqZnhFGb9ke9rq5pe8KhPwuVuEnhtwXN0SzTtL91cpay6oQR0xNlIcWUE";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
    catPic: document.querySelector('.cat-info-pic'),
    catDesc: document.querySelector('.cat-info-desc')
}
refs.select.addEventListener('change', changeSelect);

function renderSelect (breeds){
    const markup = breeds
    .map(breed => {
        return `<option value='${breed.reference_image_id}'>${breed.name}</option>`;
    })
    .join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
        select: '#single', //Ініціалізація бібліотеки
    });
};

//Функція, що отримує дані та на їх основі створює розмітку випадаючого списку

function fetchBreedsRender () {
    refs.loader.classList.remove('unvisible')
    fetchBreeds()
    .then(breeds => renderSelect (breeds)) //Функція, що генерує розмітку випадаючого списку
    .catch(error => {
        console.log(error);
        Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'   
        );
    })
    .finally(() => {
        refs.loader.classList.add('unvisible');
        refs.select.classList.remove('unvisible');
    });
};
//Функція, що генерує розмітку опису обраної породи кота (картинка та текст)
function renderDesc (breed) {
    const picture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
    const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
    refs.catPic.insertAdjacentHTML('beforeend', picture);
    refs.catDesc.insertAdjacentHTML('beforeend', descript);
};
//Функція, яка виконується 
//при виборі породи кота у списку (подія change на селекті)

function changeSelect (e) {
    refs.loader.classList.remove('unvisible');
    refs.catPic.innerHTML = '';
    refs.catDesc.innerHTML = '';
     const breedId = e.target.value;
     console.log('breedId: ', breedId);
     fetchCatByBreed (breedId)
     .then(breed => renderDesc(breed)) //Функція, що генерує розмітку опису обраної породи кота (картинка та текст)
     .catch (error => {
        console.log(error);
        Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'    
        );
     })
     .finally(() => refs.loader.classList.add ('unvisible'));
}