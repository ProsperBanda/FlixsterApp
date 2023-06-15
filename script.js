console.log("Hello!")

var submitBtn = document.getElementById("submitBtn");
var searchMovie = document.getElementById("searchMovie");
var moviesDiv = document.getElementById("moviesDiv");
var loadMoreBtn = document.getElementById("loadMoreBtn");

// Add event listeners to the buttons
submitBtn.addEventListener("click", handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

// Define the functions to be executed when the buttons are clicked
function handleSubmit(event) {
    event.preventDefault();

    console.log('Submit button clicked!');
}

function handleLoadMore() {
  console.log('Load more button clicked!');
}