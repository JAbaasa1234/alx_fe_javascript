const quotes = [
    {text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    {text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Leadership"},
    {text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Courage"},
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuote');

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
}

function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.id = 'quoteForm';

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

    document.body.appendChild(formDiv);
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory};
        quotes.push(newQuote);
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