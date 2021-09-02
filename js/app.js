document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // handle empty search request
    if (searchText === '') {
        displayError();
    }
    else {
        // display spinner
        document.getElementById('spinner').style.display = 'block';
        // hide error
        document.getElementById('error-message').style.display = 'none';
        // clear search result
        document.getElementById('search-result').textContent = '';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        //console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';
}
// display search result
const displaySearchResult = books => {
    //console.log(data.docs);
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const bookList = books.length;
    console.log(bookList);
    if (bookList === null) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${bookList}`;
        // retrieve each book and display in a card
        books.forEach(book => {   
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center shadow-lg">
                <img class="px-4 py-4" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-50 h-50 mx-auto" alt="Book">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title ? book.title : "N/A"}</h5>
                    <p class="card-text"><b>Author Name:</b> ${book.author_name ? book.author_name : "N/A"}</p>
                    <p class="card-text"><b>Publisher:</b> ${book.publisher ? book.publisher : "N/A"}</p>
                    <p class="card-text"><b>First Publish:</b> ${book.first_publish_year ? book.first_publish_year : "N/A"}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
} 
