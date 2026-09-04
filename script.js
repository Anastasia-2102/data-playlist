let button = document.getElementById("song-button");
let artistButton = document.getElementById("artist-button");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let nextButton = document.getElementById("next-button");
let backButton = document.getElementById("back-button");
let topButton = document.getElementById("top-button");
let surpriseButton = document.getElementById("surprise-button");

let songs = [];
let index = 0;
let input = document.getElementById("artist-input");


  async function loadSongs() {
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/viral-50-usa/records?limit=50" + input.value);

  console.log("Status: " + response.status);

  let data = await response.json();
  songs = data.records;
  console.log("Records: " + songs.length);
  
  

  if (songs.length === 0) {
    document.getElementById("track-name").textContent = "No tracks found.";
    document.getElementById("track-facts").textContent = "";
    return;
  }

  showSong();
}
  
  
  async function searchSongs() {
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/viral-50-usa/records?limit=50&search=" + searchInput.value);

  let data = await response.json();
  songs = data.records;
  if (songs.length === 0) {
  document.getElementById("track-name").textContent = "No tracks found.";
  document.getElementById("track-facts").textContent = "";
  return;
}
  index = 0;
  showSong();
}
  
  
  function showSong() {
  let song = songs[index];

  document.getElementById("track-name").textContent = song["Track Name"];
  document.getElementById("track-facts").textContent = "#" + song.Position + " — " + song.Artist;
  document.getElementById("track-count").textContent = (index + 1) + " of " + songs.length;
}

button.addEventListener("click", function () {
  loadSongs();
});

nextButton.addEventListener("click", function () {
  index = index + 1;

  if (index > songs.length - 1) {
    index = 0;
  }

  showSong();
});

backButton.addEventListener("click", function () {
  index = index - 1;

  if (index < 0) {
    index = songs.length - 1;
  }

  showSong();
});

topButton.addEventListener("click", function () {
  index = 0;
  showSong();
});

surpriseButton.addEventListener("click", function () {
  index = Math.floor(Math.random() * songs.length);
  showSong();
});

artistButton.addEventListener("click", function () {
  let wanted = songs[index].Artist;

  songs = songs.filter(function (song) {
    return song.Artist === wanted;
  });

  index = 0;
  showSong();
});

searchButton.addEventListener("click", function () {
  searchSongs();
});