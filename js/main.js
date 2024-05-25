import { fetchApi } from "./fetch";
const API_KEY = 'api_key=05286bc784abc8afd47c10b584fd977f';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;
const genre = [
    {
      "id": 28,
      "name": "Action"
    },
    
    {
      "id": 35,
      "name": "Comedy"
    },

    {
      "id": 27,
      "name": "Horror"
    },

    {
      "id": 10749,
      "name": "Romance"
    },

    {
      "id": 53,
      "name": "Thriller"
    },
  ]
const movieGrid = document.getElementById("movie-grid-id")
const searchContainer = document.getElementById("search-container-id");
const search = document.getElementById('inputBox')
const filterContainer = document.getElementById("filter-container-id");

getMovies(API_URL)

async function getMovies (url) {
    const data = await fetchApi(url)
    if(data.results.length !== 0){
        showMovies(data.results.splice(2,10));
        console.log(data.results)
    } else {
        movieGrid.innerHTML= `<h1 class="error">No Results Found</h1>`
    }
}

let selectedGenre = []
setGenre();
 function setGenre() {
filterContainer.innerHTML = ''
genre.forEach(genre => {
    const g = document.createElement('button')
    g.classList.add('filters')
    g.id = genre.id
    g.innerText = genre.name;
    g.addEventListener('click', () => {
        if(selectedGenre.length == 0) {
            selectedGenre.push(genre.id);
        } else {
            if(selectedGenre.includes(genre.id)) {
                selectedGenre.forEach((id, index) => {
                    if(id == genre.id) {
                        selectedGenre.splice(index, 1)
                    }
                })
            } else {
                selectedGenre.push(genre.id)
            }
        }
        console.log(selectedGenre)
        getMovies(API_URL+ '&with_genres='+encodeURI(selectedGenre.join(',')))
        highlightSelection()
    } )
    filterContainer.appendChild(g)
})
}

function highlightSelection() {
    const filters = document.querySelectorAll('.filters');
    filters.forEach(filter => {
        filter.classList.remove('highlight')
    })
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }
}

function showMovies(data) {
    movieGrid.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, id} = movie
        const movieEl = document.createElement('section')
        movieEl.classList.add('movie');
        movieEl.innerHTML = 
        `   <a class="card"   href="details.html" id="links-id data-id="${id}">
            <span class=" absolute left-4 top-5" id="rating-blur">
          <img class="w-4 h-4" src="img/star.png" alt="">
          <p class="text-sm  text-orange" id="rating">${vote_average}</p>
        </span>

        <figure class="top-20 left-0">
          <img class="w-64 h-78 rounded-lg" src="${IMG_URL+poster_path}" alt="${title}">
          <figcaption class=" text-sm font-semibold absolute mt-5 left-4 z-10" id="movie-name">${title}</figcaption>
        </figure> </a> `
    
        movieGrid.appendChild(movieEl)
    })
}

searchContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchItem = search.value
    if (searchItem) {
         getMovies(searchURL+'&query='+searchItem)
       
    } else {
        getMovies(API_URL)
    }
})

