const api = '710b6fece39fed00038f90dcfe8a909a';
const URL = 'https://api.themoviedb.org/3/';
const imageURLBanner = 'https://image.tmdb.org/t/p/original';
const imageURLPoster = 'https://image.tmdb.org/t/p/w500';
const imageURLCast = 'https://image.tmdb.org/t/p/w200';
const lang = 'pt-BR';

const breakpointMobileLarge = window.matchMedia('(max-width: 468px)')

function listMovies(data) {

    const moviesElement = document.createElement('div')
    moviesElement.setAttribute('class', 'movies');

    if(data.length > 0) {
        data.map(movie => {
        
            const movieElement = document.createElement('div')
            movieElement.setAttribute('class', 'movie')
            movieElement.setAttribute('data-movie-id', movie.id)
    
            const movieBannerElement = document.createElement('img')
            movieBannerElement.setAttribute('class', 'banner-movie-list')
            
            if(movie.poster_path) {
                const banner = imageURLPoster + movie.poster_path;
                movieBannerElement.src = banner
            } else {
                const banner = 'https://via.placeholder.com/200x300';
                movieBannerElement.src = banner
            }
    
            movieElementInfo = createElementInfoMovie(movie)
    
            movieElement.appendChild(movieBannerElement)
            movieElement.appendChild(movieElementInfo)
            moviesElement.appendChild(movieElement)
        })
    } else {
        moviesElement.innerHTML = '<p>Não encontramos resultado</p>';
    }    

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
    const attributeImgMovie = target.path[0].getAttribute('class')
    const attributeCloseMovie = target.path[1].getAttribute('class')
    
    if(attributeImgMovie === 'banner-movie-list') {

        if(breakpointMobileLarge.matches) {
            const linkMovie = target.path[1].children[1].childNodes[3].href;
            window.open(linkMovie, '_self')
        }
        
        const checkWindowInfoMovie = document.querySelectorAll('.movie.open');
        
        if (checkWindowInfoMovie.length > 0) {
            checkWindowInfoMovie.forEach( infoOpened => {
                infoOpened.classList.remove('open');
            })
        }
        
        const windowInfoMovie = target.path[1];
        windowInfoMovie.classList.toggle('open')
        windowInfoMovie.scrollIntoView({
            behavior: 'smooth'
        })
    }

    if(attributeCloseMovie === 'close-info-element-movie') {
        const closeWindowInfoMovie = target.path[3]
        closeWindowInfoMovie.classList.remove('open')
    }
}
