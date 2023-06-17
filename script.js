console.log("Hello!")

// Declare a variable to store the api key
const apiKey = '9a346f17bae1f4a51b997cf9ddff71f1';
const baseUrl = 'https://api.themoviedb.org/3';

var clearBtn = document.getElementById("clear-button");


let page = 1;
let currentMovies = [];

//Fetch the list of current movies from TMDB API
async function fetchCurrentMovies(){
    try{
        const response = await fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`);
        const data = await response.json();
        currentMovies = currentMovies.concat(data.results);
        displayMovies(data.results);
        page++;
    } catch(error){
        console.log(error);
    }
}

//Display movies on the webpage
function displayMovies(movies){
    const moviesList = document.getElementById('movies-list');
    
    movies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.className = 'movie-item';

        const moviePoster = document.createElement('img');


        if(movie.poster_path == null){
            moviePoster.src = 'nullimg.png';
        }
        else{
        moviePoster.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
    }
        moviePoster.alt = movie.title;
        moviePoster.className = 'movie-poster';
        movieItem.appendChild(moviePoster);
        const movieDetails = document.createElement('div');
        movieDetails.innerHTML = `
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-votes">⭐️ Votes: ${movie.vote_count}</p>
      `;

        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieDetails);
        moviesList.appendChild(movieItem);

    });

    //Load more movies when the Load More Button is clicked
    document.getElementById('load-more-button').addEventListener('click', fetchCurrentMovies);
    //console.log("Button clicked!");

    //Search for movies
    document.getElementById('search-form').addEventListener('submit', function(event){
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== ''){
            searchMovies(searchTerm);
            searchInput.value = '';
        }
    });

    //Clear search results and display previous current movies
    document.getElementById('clear-button').addEventListener('click', function(){
        console.log("Button clicked!");
});

    //Search movies using the API
    async function searchMovies(query){
        try{
            const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
            const data = await response.json();
            const searchResults = data.results;

            const divElement = document.getElementById('movies-list');
            divElement.innerHTML = ''; 
            displayMovies(searchResults);

               
        } catch(error){
            console.log(error);
        }

    }
}





//Fetch initial movies
fetchCurrentMovies();

