const containerPopularMovies = document.querySelector('#container-popular-movies');
containerPopularMovies.setAttribute('class', 'list-movies')

const containerSearchMovies = document.querySelector('#container-search-movies');
containerSearchMovies.setAttribute('class', 'list-movies')

const movieSearch = document.querySelector('#input-search');
const buttonSearch = document.querySelector('#button-search')

buttonSearch.onclick = event => {
    event.preventDefault();

    const movie = movieSearch.value;
    const newURL = `${URL}search/movie?api_key=${api}&query=${movie}&language=${lang}`

    const titleContainer = document.createElement('h2')
    titleContainer.setAttribute('class', 'title-list-movie')
    titleContainer.innerHTML = `Você pesquisou por: ${movie}`


    fetch(newURL)
        .then( response => response.json())
        .then( result => {
            const data = result.results;
            const movies = listMovies(data);
            containerSearchMovies.innerHTML = '';

            containerSearchMovies.appendChild(titleContainer);
            containerSearchMovies.appendChild(movies)
        })
        .catch( error => {
            console.log('Error: ', error)
        })
}

function showPopularMovies() {
    const titleContainer = document.createElement('h2')
    titleContainer.setAttribute('class', 'title-list-movie')
    titleContainer.innerHTML = 'Populares da semana'

    const newURL = `${URL}trending/movie/week?api_key=${api}&language=${lang}&page=1`

    fetch(newURL)
        .then(response => response.json())
        .then(result => {
            const data = result.results
            const movies = listMovies(data)
            
            containerPopularMovies.appendChild(titleContainer);
            containerPopularMovies.appendChild(movies)
        })
}
showPopularMovies();

