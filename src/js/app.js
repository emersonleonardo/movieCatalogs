const containerPopularMovies = document.querySelector('#container-popular-movies');
containerPopularMovies.setAttribute('class', 'list-movies')

const containerSearchMovies = document.querySelector('#container-search-movies');
containerSearchMovies.setAttribute('class', 'list-movies')

const movieSearch = document.querySelector('#input-search');
const buttonSearch = document.querySelector('#button-search')

buttonSearch.onclick = async event => {
    event.preventDefault();

    const path = 'search/movie'
    const query = movieSearch.value;
    const newURL = createUrlSearch(path, query)

    const titleContainer = document.createElement('h2')
    titleContainer.setAttribute('class', 'title-list-movie')
    titleContainer.innerHTML = `Você pesquisou por: ${query}`

    const data = await requestData(newURL)
    const movies = listMovies(data.results);

    containerSearchMovies.innerHTML = '';

    containerSearchMovies.appendChild(titleContainer);
    containerSearchMovies.appendChild(movies)
}

async function showPopularMovies() {
    const titleContainer = document.createElement('h2')
    titleContainer.setAttribute('class', 'title-list-movie')
    titleContainer.innerHTML = 'Populares da semana'

    const path = 'trending/movie/week'
    const newUrl = createUrl(path) + '&page=1';

    const data = await requestData(newUrl)
    const movies = listMovies(data.results)
            
    containerPopularMovies.appendChild(titleContainer);
    containerPopularMovies.appendChild(movies)
}
showPopularMovies();

