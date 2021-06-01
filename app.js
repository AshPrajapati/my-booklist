class Book{
    
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class Style{
    addBookToList(book)
    {
        const list = document.getElementById('book-list');
        const row =  document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="delete">X<a></td>
                `;


    list.appendChild(row);
    }

    clearFields()
    {
        document.getElementById('title').value="",
        document.getElementById('author').value="",
        document.getElementById('isbn').value="";
    }

    showAlert(instruction,className)
    {
        const div = document.createElement('div');
        div.className= `alert ${className}`;
        div.appendChild(document.createTextNode(instruction));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(function(){
            document.querySelector(".alert").remove();
        },800);
    }

    deleteBook(target)
    {
        if(target.className==='delete')
        {
            target.parentElement.parentElement.remove();
        }
    }
}


class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books=[];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const style = new Style();
            style.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book,index){
            if(book.isbn===isbn)
            {
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Load Event Listener
document.addEventListener('DOMContent',Store.displayBooks());

document.getElementById('book-form').addEventListener('submit',
function(e){
    //form value
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);
    const style = new Style();
    //Validation
    if(title===""||author===""||isbn==="")
    {
        style.showAlert('Please fill all the fields!!','error');
    }
    else{
        style.addBookToList(book);
        //Add to localstorage
        Store.addBook(book);
        style.showAlert('Yeah! Book Added Successfully','success');
        style.clearFields();
    }

    e.preventDefault();
}
);

//Deletion functionality
document.getElementById('book-list').addEventListener('click',
function(ele)
{
    const style = new Style();
    style.deleteBook(ele.target);

    //Remove from Local Storage
    Store.removeBook(ele.target.parentElement.previousElementSibling.textContent);

    style.showAlert("Book Removed Successfully!!",'success');
    ele.preventDefault();
});