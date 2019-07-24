const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
};

// object to JSON:
const bookJSON = JSON.stringify(book);
console.log(bookJSON);

// JSON to object:
const parsedBook = JSON.parse(bookJSON);
console.log(parsedBook.author);