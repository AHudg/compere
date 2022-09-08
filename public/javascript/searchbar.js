const searchbarEl = document.querySelector("#searchQuery");
const magnifyingGlassEl = document.querySelector(".fa-magnifying-glass");

function searchFor(event) {
  event.preventDefault();
  const search = searchbarEl.value;
  if (search) {
    window.location.replace(`/search/${search}`);
  }
}

magnifyingGlassEl.addEventListener("click", searchFor);
searchbarEl.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchFor(e);
  }
});
