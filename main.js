let news = [];
let page = 20;
let sources = [];
let filteredSources = {};
let sourceName = [];

async function fetchNews() {
  // let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${page}&apiKey=cda64c1dc42f43418d953ceac7b002ea`;
  let url = `https://newsapi.org/v2/everything?pageSize=${page}&q=bitcoin&apiKey=cda64c1dc42f43418d953ceac7b002ea`;
  let results = await fetch(url);
  data = await results.json();
  news = data.articles;
  sources = news.map(article => article.source.name);



  for (let i = 0; i < sources.length - 1; i++) {
    
    if (!filteredSources[sources[i]]) {
      filteredSources[sources[i]] = 1;
    } else if (filteredSources[sources[i]]) {
      filteredSources[sources[i]] += 1;
    }
  } 

  sourceName = Object.keys(filteredSources);

  render();

}

function render() {

  document.querySelector('.news-stories').innerHTML = news.map( article => `
  <div class = "news-story p-5 my-4">
    <h2>${article.title}</h2>
    <p>${article.source.name}</p>
    <p>${moment(article.publishedAt).startOf('hour').fromNow()}</p>
    <p> <a href="${article.url}"> View more </a> </p>
    <div class = "news-image">
      <img src = "${article.urlToImage}" width= "100%"/>
    </div>
  </div>
  `).join('');

  document.querySelector('#total-stories').innerHTML = `Total stories = ${news.length}`;

  document.querySelector('#checkbox-area').innerHTML = Object.keys(filteredSources).map(x => `<input id="${x}" type="checkbox" checked>(${filteredSources[x]})${x}`).join('');

  filterCategories();

}

let loadMoreStories = () => {
  page += 20;
  fetchNews();
}

let filterCategories = () => {
  for (let i = 0; i < sourceName.length - 1; i++) {
    if ( document.querySelector(`#${sourceName[i]}`).checked ) {
      news = news.filter(article => article.source.name != sourceName[i] );
    }
  }
  for (let i = 0; i < sourceName.length - 1; i++) {
    document.querySelector(`#${sourceName[i]}`).addEventListener('change', render);
  }

  console.log(news);

}

let loadBtn = document.querySelector('#load-more-stories');
loadBtn.addEventListener('click', loadMoreStories);





fetchNews();




let main = () => {

}


// let techCrunch = document.querySelector('#TechCrunch');
// console.log(techCrunch.checked);