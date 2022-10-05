const searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener("click", () => {
    let movieInputValue = document.getElementById("movie-input");
    if(movieInputValue.value){
        console.log(movieInputValue.value)
       fetch(`http://www.omdbapi.com/?t=${movieInputValue.value}&apikey=730ab47a`)
        .then(res => res.json())
        .then(movie => {
            for (let element of document.getElementsByClassName("main-section")){
                element.style.display="none";
             }
            document.getElementById("movie-list").innerHTML = `
            <div class="movie-list">
            <div class="movie">
                <img src="${movie.Poster}" alt="poster" id="movie-poster">
                <div id="movie-details">
                    <div id="title-detail">
                        <h1 class="title">${movie.Title}</h1>
                        <span><img src="/icons/star.png" alt="star-icon">${movie.imdbRating}</span>
                    </div>
                   <div class="rating-genre">
                        <div id="runtime">${movie.Runtime}</div>
                        <div id="genre">${movie.Genre}</div>
                        <span><img src="/icons/addition.png" alt="star-icon"> Watchlist</span>
                   </div>
                   <div id="movie-plot">${movie.Plot}</div>
                </div>
            </div>
            <hr>
            </div>
            ` 
        console.log(movie)
        }).catch(document.getElementsByClassName("main-section").display = 'block')
    }

    movieInputValue.value = ""
})


