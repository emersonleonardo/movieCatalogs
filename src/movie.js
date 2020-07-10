const query = window.location.search;

const getParams = new URLSearchParams(query)

const params = getParams.get('t')

const container = document.querySelector('#container-info-movie')

getInfo(params);

async function getInfo(movieID) {
    
    const newULR = `${URL}movie/${movieID}?api_key=${api}&language=${lang}`

    await fetch(newULR)
    .then(response => response.json())
    .then(result => {
        const movie = createContentMovie(result)
        container.appendChild(movie);
    })
    .catch(error => console.log('Error: ', error))

    getCasts(movieID)
}

async function getCasts(movieID) {
    const newURLCasts = `${URL}movie/${movieID}/credits?api_key=${api}&language=${lang}`

    await fetch(newURLCasts)
        .then(response => response.json())
        .then(result => {
            const casts = createContentCasts(result.cast)
            container.appendChild(casts)
        })
        .catch(error => console.log('Error: ', error))

    getVideos(movieID)
}

async function getVideos(movieID) {
    const newUrlVideos = `${URL}movie/${movieID}/videos?api_key=${api}&language=${lang}`

    await fetch(newUrlVideos)
    .then(response => response.json())
    .then(result => {
        const videos = createContentVideos(result.results)
        container.appendChild(videos)
    })
    .catch(error => console.log('Error: ', error))

    getSimilarMovies(movieID)
}

async function getSimilarMovies(movieID) {
    const sectionVideos = document.createElement('section')
    sectionVideos.setAttribute('class', 'section-similar-movies list-movies')

    const titleContainer = document.createElement('h2')
    titleContainer.setAttribute('class', 'title-list-movie')
    titleContainer.innerHTML = 'Sugestões'

    const newUrlVideos = `${URL}movie/${movieID}/similar?api_key=${api}&language=${lang}`

    await fetch(newUrlVideos)
    .then(response => response.json())
    .then(result => {
        const data = result.results
        const movies = listMovies(data)
            
        sectionVideos.appendChild(titleContainer);
        sectionVideos.appendChild(movies)
        container.appendChild(sectionVideos)
    })
    .catch(error => console.log('Error: ', error))
}

function createContentMovie(data) {
    document.title = data.title

    const section = document.createElement('section')
    section.setAttribute('class', 'section-movie')
    section.style.backgroundImage = `url(${imageURLBanner}${data.backdrop_path})`

    const mask = document.createElement('div')
    mask.setAttribute('class', 'mask')

    const content = document.createElement('div')
    content.setAttribute('class', 'content-movie')

    const infoMovie = document.createElement('div')
    infoMovie.setAttribute('class', 'info-movie')

    const contentBanner = document.createElement('div')
    contentBanner.setAttribute('class', 'content-movie-banner')

    const poster = document.createElement('img')
    poster.setAttribute('class', 'poster-movie')
    poster.src = `${imageURLPoster}${data.poster_path}`
    poster.setAttribute('alt', data.title)

    const title = document.createElement('h1')
    title.setAttribute('class', 'title-movie')
    title.innerHTML = data.title

    const subTitle = document.createElement('h3')
    subTitle.setAttribute('class', 'subtitle-movie')
    subTitle.innerHTML = data.tagline

    const sinopse = document.createElement('p')
    sinopse.setAttribute('class', 'sinopse-movie')
    sinopse.innerHTML = data.overview

    const releaseDate = document.createElement('span')
    releaseDate.setAttribute('class', 'release-date-movie')
    releaseDate.innerHTML = data.release_date

    const voteAverage = document.createElement('span')

    if(data.vote_average >= 7) {
        voteAverage.setAttribute('class', 'vote-average green')
    } else if(data.vote_average <= 4) {
        voteAverage.setAttribute('class', 'vote-average red')
    } else {
        voteAverage.setAttribute('class', 'vote-average yellow')
    }

    voteAverage.innerHTML = data.vote_average

    content.appendChild(title)

    if(subTitle) {
        content.appendChild(subTitle)
    }

    infoMovie.appendChild(voteAverage)
    infoMovie.appendChild(releaseDate)

    content.appendChild(infoMovie)
    content.appendChild(sinopse)

    contentBanner.appendChild(poster)

    section.appendChild(mask)
    section.appendChild(content)
    section.appendChild(contentBanner)

    return section
    
}

function createContentVideos(data) {
    const sectionVideos = document.createElement('section')
    sectionVideos.setAttribute('class', 'section-videos')

    const contentVideos = document.createElement('div')
    contentVideos.setAttribute('class', 'content-videos')

    const titleSection = document.createElement('h2')
    titleSection.setAttribute('class', 'title-section')
    titleSection.innerHTML = 'Vídeos'
    
    data.map(video => {
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${video.key}`
        iframe.setAttribute('allowfullscreen', 'allowfullscreen')
        
        contentVideos.appendChild(iframe)
    })

    // return sectionMovie.parentNode.insertBefore(sectionVideos, sectionMovie.nextSibling)
    sectionVideos.appendChild(titleSection)
    sectionVideos.appendChild(contentVideos)

    return sectionVideos
}

function createContentCasts(data) {
    const sectionCasts = document.createElement('section')
    sectionCasts.setAttribute('class', 'section-casts')

    const contentCasts = document.createElement('div')
    contentCasts.setAttribute('class', 'content-casts')

    const titleSection = document.createElement('h2')
    titleSection.setAttribute('class', 'title-section')
    titleSection.innerHTML = 'Elenco'

    data.slice(0, 30).map(cast => {
        const contentCast = document.createElement('div')
        contentCast.setAttribute('class', 'content-cast')

        const castImage = document.createElement('div')
        castImage.setAttribute('class', 'cast-image')
        castImage.style.backgroundImage = `url(${imageURLCast}${cast.profile_path})`

        const castCharacter = document.createElement('p')
        castCharacter.setAttribute('class', 'cast-character')
        castCharacter.innerHTML = cast.character

        const castName = document.createElement('p')
        castName.setAttribute('class', 'cast-name')
        castName.innerHTML = cast.name

        contentCast.appendChild(castImage)
        contentCast.appendChild(castName)
        contentCast.appendChild(castCharacter)
        contentCasts.appendChild(contentCast)
    })

    sectionCasts.appendChild(titleSection)
    sectionCasts.appendChild(contentCasts)

    return sectionCasts
}