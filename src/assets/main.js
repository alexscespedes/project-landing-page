const API =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const content = null || document.getElementById('content');

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODg4NzBjNGZlNzZlOWE3M2YwZTVhYTc4Nzc0NTVmZSIsInN1YiI6IjYxOTNjNzJiOTU3ZTZkMDA0MmJjNWIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2HmwcfIZpx_9BHfvpkE90wYr4Ft9rV0VX6vdnI2I_1U",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const movies = await fetchData(API);
    console.log(movies)
    // const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    let view = `
  ${movies.results.map(movie => {
    return `
      <div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.overview}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-lg font-bold text-gray-800">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${movie.title}
          </h3>
        </div>
      </div>
    `;
  }).slice(0, 8).join('')}
`;
        content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
