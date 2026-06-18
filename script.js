const button = document.querySelector(".hero button");

button.addEventListener("click", () => {
    alert("Welcome to Netflix Clone!");
});
const search = document.getElementById("search");

search.addEventListener("keyup", async () => {

    const value = search.value.trim();

    if(value.length < 3) return;

    const response = await fetch(
        `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}`
    );

    const data = await response.json();

    const container = document.getElementById("trendingMovies");

    container.innerHTML = "";

    if(data.Search){
        data.Search.forEach(movie => {
            container.innerHTML += `
                <img src="${movie.Poster}" alt="${movie.Title}">
            `;
        });
    }
});
const questions = document.querySelectorAll(".question");

questions.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.nextElementSibling.classList.toggle("show");

    });

});

const API_KEY = "4927b112";

async function loadMovies() {
    const response = await fetch(
        `https://www.omdbapi.com/?s=avengers&apikey=${API_KEY}`
    );

    const data = await response.json();

    const container = document.getElementById("trendingMovies");

    container.innerHTML = "";

    data.Search.forEach(movie => {
        container.innerHTML += `
            <img
                src="${movie.Poster}"
                alt="${movie.Title}"
                title="${movie.Title}"
            >
        `;
    });
}

loadMovies();
async function getMovieDetails(imdbID){

    const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=${API_KEY}`
    );

    return await response.json();
}
async function fetchCategory(keyword, containerId) {

    const response = await fetch(
        `https://www.omdbapi.com/?s=${keyword}&apikey=${API_KEY}`
    );

    const data = await response.json();

    const container = document.getElementById(containerId);

    container.innerHTML = "";

    for(const movie of data.Search){

        const details = await getMovieDetails(movie.imdbID);

        container.innerHTML += `
            <div class="movie-card">

                <img src="${movie.Poster}" alt="${movie.Title}">

                <h3>${movie.Title}</h3>

                <p><strong>Year:</strong> ${movie.Year}</p>

                <p><strong>IMDb:</strong> ${details.imdbRating}</p>

                <p>${details.Plot}</p>

            </div>
        `;
    }
}

fetchCategory("avengers", "trendingMovies");
fetchCategory("batman", "popularMovies");
fetchCategory("action", "actionMovies");
fetchCategory("marvel", "topRatedMovies");
