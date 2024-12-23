const authors = [
    {
        id: "1",
        name: 'Albert',
        surname: 'Camus',
        age: 50,
    },
    {
        id: "2",
        name: 'Furkan',
        surname: 'Boncuk',
        age: 19,
    },
];

const books = [
    {
        id: "1",
        title: 'Yabancı',
        author_id: "1",
        score: 6.9,
        isPublished: true
    },
    {
        id: "2",
        title: 'Deneme Kitap',
        author_id: "2",
        score: 5.4,
        isPublished: false
    },
    {
        id: "3",
        title: '2.deneme kitap',
        author_id: "2",
        score: 1.9,
        isPublished: true
    }
];

module.exports = {
    authors,
    books
}