// Import the getMovies function from the main module
import { getMovies } from "./main";

const API_KEY = 'api_key=05286bc784abc8afd47c10b584fd977f';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const genres = [
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
];

const filterContainer = document.getElementById("filter-container-id");
let selectedGenre = [];

// Function to set genre filters
function setGenre() {
  filterContainer.innerHTML = '';

  // Iterate through each genre and create a button for it
  genres.forEach(genre => {
    const button = document.createElement('button');
    button.classList.add('filters');
    button.id = genre.id;
    button.innerText = genre.name;

    // Add event listener to toggle selected genres
    button.addEventListener('click', () => {
      // Check if genre is already selected
      if (selectedGenre.includes(genre.id)) {
        // Remove genre from selectedGenre
        selectedGenre = selectedGenre.filter(id => id !== genre.id);
      } else {
        // Add genre to selectedGenre
        selectedGenre.push(genre.id);
      }

      // update movie list
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));

      // Highlight selected genres
      highlightSelection();
    });

    // Append button to filter container
    filterContainer.appendChild(button);
  });
}

// this should be called inside main.js
setGenre();

function highlightSelection() {
  // Select all elements with the class 'filters'
  const filters = document.querySelectorAll('.filters');
  
  // Remove the 'highlight' class from all filters
  filters.forEach(filter => {
    filter.classList.remove('highlight');
  });
  
  // If there are selected genres
  if (selectedGenre.length) {
    // Loop through each selected genre ID
    selectedGenre.forEach(id => {
      // Find the element with the corresponding ID
      const highlightedTag = document.getElementById(id);
      // Add the 'highlight' class to the found element
      if (highlightedTag) {
        highlightedTag.classList.add('highlight');
      }
    });
  }
}
