let news = [];

async function fetchNews() {
  let url = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=cda64c1dc42f43418d953ceac7b002ea';
  let results = await fetch(url);
  let data = await results.json();
  news = data.articles;
  render();
}

function render() {
  document.querySelector('.news-stories').innerHTML = news.map( article => `
  <div class = "news-story p-5 my-4">
    <h2>${article.title}</h2>
    <p>${article.source.name}</p>
    <p>${article.publishedAt}</p>
    <p> <a href="${article.url}"> View more </a> </p>
    <div class = "news-image">
      <img src = "${article.urlToImage}" width= "100%"/>
    </div>
  </div>
  `).join('');
  document.querySelector('#total-stories').innerHTML = `Total stories = ${news.length}`
}

fetchNews();