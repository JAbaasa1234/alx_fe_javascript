const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    {text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    {text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Leadership"},
    {text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Courage"},
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuote');

const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
if (lastViewedQuote) {
    quoteDisplay.innerHTML = lastViewedQuote;
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
    quoteDisplay.innerHTML = quoteHTML;
    sessionStorage.setItem('lastViewedQuote', quoteHTML);
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function createAddQuoteForm() {
    const formDiv = document.querySelector('.quoteForm');

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Add a New Quote';
    formDiv.appendChild(formTitle);

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    formDiv.appendChild(quoteInput);

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    formDiv.appendChild(categoryInput);

    const addButton = document.createElement('button');
    addButton.id = 'addQuote';
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
    formDiv.appendChild(addButton);
}

createAddQuoteForm();

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory};
        quotes.push(newQuote);
        saveQuotes();
        alert('Quote added successfully!');

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both the quote text and category.');
    }
}

newQuoteBtn.addEventListener('click', showRandomQuote);

addQuoteBtn.addEventListener('click', addQuote)

showRandomQuote();

document.getElementById('exportQuotes').addEventListener('click', function() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
});

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}