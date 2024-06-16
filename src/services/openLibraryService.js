const BASE_URL = 'https://openlibrary.org';
const COVER_URL = 'https://covers.openlibrary.org/b/isbn/';
const ERR_MESSAGE = 'Network response was not ok';

const searchBooks = async (query) => {
    const response = await fetch(`${BASE_URL}/search.json?title=${query}`);
    if (!response.ok) throw new Error(ERR_MESSAGE);
    return await response.json();
};

const getBookCoverByISBN = (isbn) => {
    return `${COVER_URL}${isbn}-S.jpg`;
};

export {searchBooks, getBookCoverByISBN};












