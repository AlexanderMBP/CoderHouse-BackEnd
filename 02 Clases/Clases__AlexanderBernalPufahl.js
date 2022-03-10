class User {
    constructor(name,lastName,books,pets){
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    //Methods

    getFullName () {
        let fullName = `${this.name} ${this.lastName}`
        return (fullName);
    }

    addPet (newPet) {
        let pets = this.pets;
        pets.push(newPet);
        return ("New pet added");     
    }

    countPets () {
        let pets = this.pets;
        let petCount = pets.length;
        return (petCount);
    }
    
    addBook (name, author) {
        let books = this.books;
        let newBook = {
            name,
            author
        };
        books.push(newBook);
        return ("New book added")
    }

    getBookNames () {
        let books = this.books;
        let bookName = [];
        books.forEach(book => {bookName.push(book.name)});
        return (bookName)
    }
}

//Testing

let user = new User ("Alexander", "Bernal", [{name: "Harry Potter Saga", author: "J. K. Rowling"}], ["Dog"])

console.log(user);
console.log(user.getFullName())
console.log(user.addPet("Cat"))
console.log(user.countPets())
console.log(user.addBook("The last wish", "Andrzej Sapkowski"));
console.log(user.books[0], user.books[1]);
console.log(user.getBookNames());
console.log(user)
