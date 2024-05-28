import { fetchApi } from "./fetch";
const API_KEY = `05286bc784abc8afd47c10b584fd977f`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const detailsGrid = document.getElementById('details-grid-id')

get_movie_by_id(33300)
async function get_movie_by_id (id) {
    const data = await fetchApi(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    console.log(data)
    return data
}

    async function showDetails () {
    const movie = await get_movie_by_id(823464)
    detailsGrid.innerHTML =  `
    <div>
    <figure class="flex content-center items-center relative">
    <img id="horizontal-image" src="${IMG_URL + movie.backdrop_path}" alt="${movie.title}">
    
    <span class=" md:left-40 md:w-3/12 lg:h-54 lg:w-5/12 lg:left-40  xl:h-54 xl:w-7/12 xl:left-80 absolute  pb-10" id="title-container-blur">
      <p class=" md:text-sm lg:text-md xl:text-2xl text-fuchsia-200 mt-8">Thriller</p>
        <h1 class=" md:text-sm lg:text-xl xl:text-4xl font-semibold " id="movie-title">${movie.title}</h1>
      </span>
  </figure>

  <section class="flex mt-40 gap-20 ml-36 mr-36">
    <figure>
      <img class="rounded-md  md:w-90 lg:min-w-80" id="vertical-image" src=${IMG_URL + movie.poster_path}" alt="${movie.title}">
    </figure>

  <section class="flex flex-col gap-5">
    <h1 class="md:text-sm lg:text-lg xl:text-4xl font-extrabold text-white" id="movie-tag-id">${movie.tagline}</h1>
    <p class="text-gray md:text-xs lg:text-md xl:text-xl mt-5">${movie.overview}</p>

    <span class="left-4 top-5" id="rating-blur">
      <img class="w-4 h-4" src="img/star.png" alt="">
      <p class="text-xs  text-orange" id="rating">${movie.vote_average}</p>
    </span>

    <span>
    <h3 class="text-gray md:text-sm lg:text-xl font-extralight">Release Date</h3>
    <h2 class="md:text-xs lg:text-md xl:text-xl text-gray-light mt-1">${movie.release_date}</h2>
      </span>

    <span>
      <h3 class="text-gray lg:text-xl font-extralight">Runtime</h3>
      <h2 class="md:text-xs lg:text-md xl:text-xl text-gray-light mt-1">${movie.runtime}</h2>
      </span>

      <span>
        <h3 class="text-gray lg:text-xl font-extralight">Genres</h3>
        <ul class="md:text-xs lg:text-md xl:text-xl text-gray-light mt-1 flex gap-2">
        ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
      </ul>
        </span>
  </section>

</section>
</div>` 

}   

showDetails()

