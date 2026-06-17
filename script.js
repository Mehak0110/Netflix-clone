const button = document.querySelector(".hero button");

button.addEventListener("click", () => {
    alert("Welcome to Netflix Clone!");
});
const search = document.getElementById("search");

search.addEventListener("keyup", () => {
    let value = search.value.toLowerCase();

    document.querySelectorAll(".movie-row img").forEach(movie => {
        let name = movie.alt.toLowerCase();

        if(name.includes(value)){
            movie.style.display = "block";
        }
        else{
            movie.style.display = "none";
        }
    });
});
const questions = document.querySelectorAll(".question");

questions.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.nextElementSibling.classList.toggle("show");

    });

});
