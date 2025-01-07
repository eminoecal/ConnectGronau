'use strict'

document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "9d7d3325b8034ae083bd6764f2c9d898"; // Ersetze durch deinen NewsAPI-Schlüssel
    const URL = `https://newsapi.org/v2/everything?q=48599&apiKey=${API_KEY}`;
  
    const newsContainer = document.getElementById("news-container");
  
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const articles = data.articles;
  
        if (articles.length === 0) {
          newsContainer.innerHTML = "<p>Keine Nachrichten gefunden. </p>";
          return;
        }
  
        articles.forEach((article) => {
          const newsCard = document.createElement("div");
          newsCard.className = "col-md-4 news-card";
  
          newsCard.innerHTML = `
            <img src="${article.urlToImage || 'images/placeholder.jpg'}" alt="${article.title}">
            <div class="content">
              <h3>${article.title}</h3>
              <p>${article.description || 'Keine Beschreibung verfügbar.'}</p>
              <a href="${article.url}" target="_blank" class="btn btn-success btn-sm">Mehr erfahren</a>
            </div>
          `;
          newsContainer.appendChild(newsCard);
        });
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Nachrichten:", error);
        newsContainer.innerHTML = "<p>Fehler beim Laden der Nachrichten.</p>";
      });
  });
  