const searchBtn = document.getElementById("search-btn");
let myWatchListId = JSON.parse(localStorage.getItem("myList"));
let moviesList;

searchBtn.addEventListener("click", () => {
    let movieInputValue = document.getElementById("movie-input");
    if(movieInputValue.value){
        console.log(movieInputValue.value)
       fetch(`http://www.omdbapi.com/?apikey=730ab47a&type=movie&s="${movieInputValue.value}"`)
        .then(res => res.json())
        .then(data => {
            if(data.Response === "False"){
                console.log("response failed")
                document.getElementById("section").innerHTML = `
                <h2>Unable to find what you’re looking for. Please try another search.</h2>
                `
            }
            else {
                console.log(data)
                for (let element of document.getElementsByClassName("main-section")){
                    element.style.display="none";
                 }

                 const moviesId = data.Search.map(movies =>  movies.imdbID)
                 console.log(moviesId)
                 render(moviesId);
            }
         })
    }

    movieInputValue.value = "";
})



function render(ids){
    ids.map(id => {
        moviesList = ""
        fetch(`http://www.omdbapi.com/?apikey=730ab47a&i=${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("hello" + data.watchList)
                moviesList += `
                <div class="movie">
                    <img src="${data.Poster}" alt="poster" id="movie-poster">
                    <div id="movie-details">
                        <div id="title-detail">
                            <h1 class="title">${data.Title}</h1>
                            <span><img src="/icons/star.png" alt="star-icon">${data.imdbRating}</span>
                        </div>
                       <div class="rating-genre">
                            <div id="runtime">${data.Runtime}</div>
                            <div id="genre">${data.Genre}</div>
                            <span onclick = set()><img src="/icons/addition.png" alt="star-icon"> Watchlist</span>
                       </div>
                       <div id="movie-plot">${data.Plot}</div>
                    </div>
                </div>
                <hr>
                ` 
                document.getElementById("movie-list").style.display = 'block';
                document.getElementById("movie-list").innerHTML = moviesList
         })
        
    })

}
