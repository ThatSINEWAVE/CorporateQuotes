const introDiv = document.querySelector('.intro');
const quotesDiv = document.querySelector('.quotes');
const controlsDiv = document.querySelector('.controls');
const loaderDiv = document.querySelector('.loader');

const oneQuoteButton = document.getElementById('oneQuote');
const fiveQuotesButton = document.getElementById('fiveQuotes');
const oneMoreButton = document.getElementById('oneMore');
const fiveMoreButton = document.getElementById('fiveMore');

const API_URL = 'https://corporatebs-generator.sameerkumar.website/';

oneQuoteButton.addEventListener('click', () => {
  fadeOut(introDiv);
  showLoader();
  setTimeout(() => {
    hideLoader();
    getQuotes(1);
    showControls();
  }, 1000);
});

fiveQuotesButton.addEventListener('click', async () => {
  fadeOut(introDiv);
  showLoader();
  const quotes = [];
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const quote = await fetchQuote();
    quotes.push(quote);
  }
  hideLoader();
  displayQuotes(quotes);
  showControls();
});

oneMoreButton.addEventListener('click', () => {
  clearQuotes();
  showLoader();
  setTimeout(() => {
    hideLoader();
    getQuotes(1);
    showControls();
  }, 1000);
});

fiveMoreButton.addEventListener('click', async () => {
  clearQuotes();
  showLoader();
  const quotes = [];
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const quote = await fetchQuote();
    quotes.push(quote);
  }
  hideLoader();
  displayQuotes(quotes);
  showControls();
});

async function fetchQuote() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.phrase;
}

function getQuotes(count) {
  Promise.all([...Array(count)].map(() => fetchQuote()))
    .then(quotes => {
      displayQuotes(quotes);
      showControls();
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
    });
}

function displayQuotes(quotes) {
  quotesDiv.innerHTML = '';
  quotes.forEach(quote => {
    const quoteBox = document.createElement('div');
    quoteBox.classList.add('quote-box');
    quoteBox.textContent = quote;
    quotesDiv.appendChild(quoteBox);
  });
}

function clearQuotes() {
  quotesDiv.innerHTML = '';
  controlsDiv.style.display = 'none';
}

function fadeOut(element) {
  element.style.opacity = 1;
  (function fade() {
    if ((element.style.opacity -= 0.1) < 0) {
      element.style.display = 'none';
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function showLoader() {
  loaderDiv.style.display = 'block';
}

function hideLoader() {
  loaderDiv.style.display = 'none';
}

function showControls() {
  controlsDiv.style.display = 'flex';
}