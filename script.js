const myLibrary = [
    new Book(1, '1984', 'George Orwell', 328, true),
    new Book(2, 'To Kill a Mockingbird', 'Harper Lee', 281, false),
    new Book(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 180, true),
    new Book(4, 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 417, false),
    new Book(5, 'Pride and Prejudice', 'Jane Austen', 279, true),
];

const library = document.querySelector(".library");
let next_id = myLibrary.at(-1).id + 1;
const dialog = document.querySelector("#pop-up");
const submitBtn = document.querySelector(".submit");
const cancelBtn = document.querySelector(".cancel");
const form = document.querySelector("form");

function Book(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${pages} pages, ${haveRead}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks(myLibrary);
}

function displayBooks(Library) {
    library.innerHTML = '';
    for (let book of Library) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCard.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.haveRead ? 'Have read' : 'Have not read'}</p>
            <div class="card-btns">
                <button class="read" type="button">
                    <img src="./resources/book-open.svg" alt="have not read book icon">
                </button>
                <button class="delete" type="button">
                    <img src="./resources/delete.svg" alt="remove book icon">
                </button>
            </div>
        `;
        const deleteBtn = bookCard.querySelector('.delete');
        deleteBtn.addEventListener('click', () => {
            removeBookFromLibrary(book.id);
        });

        const readBtn = bookCard.querySelector('.read');
        readBtn.addEventListener('click', () => {
            toggleReadStatus(book.id);
        });

        library.appendChild(bookCard);
    }

    const addCard = document.createElement('div');
    addCard.classList.add('card', 'add');
    addCard.innerHTML = `
        <button class="add-btn">
            <svg fill="#cbdbfc" width="160px" height="160px" viewBox="0 0 1920 1920"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M915.744 213v702.744H213v87.842h702.744v702.744h87.842v-702.744h702.744v-87.842h-702.744V213z"
                    fill-rule="evenodd" />
            </svg>
        </button>
        <p>Add New</p>
    `;
    library.appendChild(addCard);

    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", () => {
        dialog.showModal();
    });
}

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks(myLibrary);
    }
}

cancelBtn.addEventListener("clicl", () => {
    dialog.close();
    form.reset;
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = parseInt(document.querySelector("#pages").value);
    const haveRead = document.querySelector("#have-read").checked;

    const newBook = new Book(next_id++, title, author, pages, haveRead);

    addBookToLibrary(newBook);

    dialog.close();
    form.reset();
});

// submittign with enter
form.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitBtn.click();
    }
})

function toggleReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.haveRead = !book.haveRead;
        displayBooks(myLibrary);
    }
}

displayBooks(myLibrary);
