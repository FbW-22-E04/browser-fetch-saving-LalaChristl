import View from "./View.js";
import Client from "./Client.js";

// All of your javascript should go here
// console.log("Hello from index.js");

const newClient = new Client();
const newView = new View();

const input = document.querySelector("input");
const saveBtn = document.querySelector(".btn-save");
const resetBtn = document.querySelector(".btn-reset");
let movieArray = [];

input.addEventListener("change", async () => {
  if (input.value) {
    const data = await newClient.getMovieData(input.value);
    // console.log(data);
    movieArray.push(data);
    newView.displayMovieOnPage(data);
  }
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("movies", JSON.stringify(movieArray));
});
loadMovies();
function loadMovies() {
  const localStorageItem = localStorage.getItem("movies");
  const parsed = JSON.parse(localStorageItem);

  movieArray.push(...parsed);

  movieArray.forEach((item) => {
    newView.displayMovieOnPage(item);
  });
}

resetBtn.addEventListener("click", () => {
  newView.removeDisplay();
  localStorage.removeItem("movies");
  movieArray.splice(0);
});
