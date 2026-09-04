let button = document.getElementById("cat-button");

async function loadCats() {
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/cats/records?limit=10");
  console.log("Status: " + response.status);

  let data = await response.json();
  let cats = data.records;
  
  let cat = cats[0];

document.getElementById("cat-name").textContent = cat.Name;
document.getElementById("cat-facts").textContent = "From " + cat.Origin + ". " + cat.Temperament + ".";

let photo = document.getElementById("cat-photo");
photo.src = cat.Image;
photo.alt = cat.Name + " cat";
}

button.addEventListener("click", function () {
  loadCats();
});