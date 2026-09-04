let button = document.getElementById("song-button");
let nextButton = document.getElementById("next-button");
let backButton = document.getElementById("back-button");
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
  if (index < songs.length - 1) {
    index = index + 1;
    showSong();
  }
});

backButton.addEventListener("click", function () {
  if (index > 0) {
    index = index - 1;
    showSong();
  }
});