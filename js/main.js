// Import the fetchApi function from the fetch module
import { fetchApi } from "./fetch";

const sessionId = 'current_movie-id';
const API_KEY = 'api_key=05286bc784abc8afd47c10b584fd977f';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const movieGrid = document.getElementById("movie-grid-id");
const searchContainer = document.getElementById("search-container-id");
const search = document.getElementById('inputBox');

// Function to fetch movies based on a provided URL
export const getMovies = async (url) => {
  // Fetch movie data from the provided URL
  const data = await fetchApi(url);

  // Check if the fetched data contains results
  if (data.results.length === 0) {
    // If no results found, display an error message
    movieGrid.innerHTML = '<h1 class="error">No results found </h1>';
  } else {
    // If results found, display the movies
    showMovies(data.results);
  }
};

// Function to display movies in the movie grid container
function showMovies(data) {
  // Clear the movie grid container
  movieGrid.innerHTML = '';
  // Loop through each movie in the data and create HTML elements to display them
  data.forEach(movie => {
    const { title, poster_path, vote_average, id } = movie;
    const movieEl = document.createElement('section');
    movieEl.classList.add('movie', 'card');
    movieEl.setAttribute("data-id", id);
    movieEl.innerHTML =
      `<section>
          <span class="absolute left-4 top-5" id="rating-blur">
            <img class="w-4 h-4" src="img/star.png" alt="">
            <p class="text-sm  text-orange" id="rating">${vote_average}</p>
          </span>
          <figure class="top-20 left-0">
            <img class="w-64 h-78 rounded-lg" src="${IMG_URL + poster_path}" alt="${title}">
            <figcaption class=" text-sm font-semibold absolute mt-5 left-4 z-10" id="movie-name">${title}</figcaption>
          </figure>
      </section>`;

    // Append the movie element to the movie grid container
    movieGrid.appendChild(movieEl);
  });

  // Add click event listeners to each movie for redirecting to movie details page
  movieGrid.childNodes.forEach((movie) => {
    const id = movie.getAttribute('data-id');
    movie.addEventListener('click', () => {
      // When a movie element is clicked, store its ID in sessionStorage
      sessionStorage.setItem(sessionId, id);
      // Redirect the user to the movie details page
      window.location.href = 'details.html';
    });
  });
}

// Event listener for the search form submission
searchContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchItem = search.value;
  if (searchItem) {
    // If search input is provided, fetch movies based on the search query
    getMovies(searchURL + '&query=' + searchItem);
  } else {
    // If no search input provided, fetch back popular movies
    getMovies(API_URL);
  }
});

// Fetch and display popular movies on page load
getMovies(API_URL);