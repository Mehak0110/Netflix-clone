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

const API_KEY = "86773046";

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

if (!data.Search) {
    container.innerHTML = "No movies found";
    return;
}

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
fetchCategory("fast", "actionMovies");
fetchCategory("spider", "topRatedMovies");
const loginBtn = document.getElementById("loginBtn");

const dropdown = document.getElementById("dropdown");

loginBtn.addEventListener("click", () => {

    dropdown.classList.toggle("show");

});

const demoLogin = document.getElementById("demoLogin");

demoLogin.addEventListener("click", () => {

    document.getElementById("hero").style.display = "none";

    document.getElementById("featuredContent").style.display = "block";

    loginBtn.innerHTML = `
        <i class="fa-solid fa-circle-user"></i> Mehak
    `;

    const video = document.getElementById("bg-video");
    const source = document.getElementById("videoSource");

    source.src = "public/video2.mp4";

    video.load();

});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    document.getElementById("hero").style.display = "block";

    document.getElementById("featuredContent").style.display = "none";

    loginBtn.innerHTML = "Sign In";

    const video = document.getElementById("bg-video");
    const source = document.getElementById("videoSource");

    source.src = "public/netflicclone.mp4";

    video.load();

});