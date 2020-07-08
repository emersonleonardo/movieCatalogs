const api = 'API_KEY_THE_MOVIEDB';
const URL = 'https://api.themoviedb.org/3/';
const imageURL = 'https://image.tmdb.org/t/p/original';
const lang = 'pt-BR';

function listMovies(data) {

    const moviesElement = document.createElement('div')
    moviesElement.setAttribute('class', 'movies');

    data.map(movie => {
        
        const movieElement = document.createElement('div')
        movieElement.setAttribute('class', 'movie')
        movieElement.setAttribute('data-movie-id', movie.id)

        const movieBannerElement = document.createElement('div')
        movieBannerElement.setAttribute('class', 'banner-movie-list')
        
        if(movie.poster_path) {
            const banner = imageURL + movie.poster_path;
            movieBannerElement.style.backgroundImage = `url(${banner})`
        } else {
            const banner = 'https://via.placeholder.com/200x300';
            movieBannerElement.style.backgroundImage = `url(${banner})`
        }

        movieElementInfo = createElementInfoMovie(movie)

        movieElement.appendChild(movieBannerElement)
        movieElement.appendChild(movieElementInfo)
        moviesElement.appendChild(movieElement)
    })

    return moviesElement;
}

function createElementInfoMovie(data) {
    const infoElement = document.createElement('div')
    infoElement.setAttribute('class', 'window-info-movie')
    
    const titleMovie = document.createElement('h2')
    titleMovie.setAttribute('class', 'title-movie')

    if(data.title) {
        titleMovie.innerHTML = data.title        
    } else {
        titleMovie.innerHTML = data.original_name
    }

    const voteAverage = document.createElement('p')
    voteAverage.setAttribute('class', 'vote-average-movie')
    voteAverage.innerHTML = `<i class="far fa-star"></i> ${data.vote_average}`

    const sinopseMovie = document.createElement('p')
    sinopseMovie.setAttribute('class', 'sinopse-movie')
    sinopseMovie.innerHTML = data.overview

    const aboutMore = document.createElement('a')
    aboutMore.setAttribute('class', 'about-more')
    aboutMore.setAttribute('href', `content.html?t=${data.id}`)
    aboutMore.innerHTML = 'Saiba mais <i class="fas fa-angle-right"></i>'

    const closeInfoElement = document.createElement('span')
    closeInfoElement.setAttribute('class', 'close-info-element-movie')
    closeInfoElement.innerHTML = '<i class="fas fa-times"></i>'

    infoElement.appendChild(titleMovie)
    infoElement.appendChild(voteAverage)
    infoElement.appendChild(sinopseMovie)
    infoElement.appendChild(aboutMore)
    infoElement.appendChild(closeInfoElement) 

    return infoElement;
}

document.onclick = event => {
    const target = event
    const attribute = target.path[1].getAttribute('class')
    
    if(attribute === 'movie') {
        const checkWindowInfoMovie = document.querySelectorAll('.window-info-movie.open');
        
        if (checkWindowInfoMovie.length > 0) {
            checkWindowInfoMovie.forEach( infoOpened => {
                infoOpened.classList.remove('open');
                console.log(checkWindowInfoMovie)
            })
        }
        const windowInfoMovie = target.path[1].lastChild;
        windowInfoMovie.classList.add('open')
    }

    if(attribute === 'close-info-element-movie') {
        const closeWindowInfoMovie = target.path[2]
        closeWindowInfoMovie.classList.remove('open')
    }

}