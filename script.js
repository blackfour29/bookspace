class Book{
  constructor(bookIllustrationElement, bookCardElement, bookData){
    this.bookIllustrationElement = bookIllustrationElement;
    this.bookCardElement = bookCardElement;
    this.bookData = bookData;
  }
}

// sidebar content
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu__icon");
const logoIconEl = document.querySelector(".sidebar__logo");
const logoNameEl = document.querySelector(".sidebar__title");
const navTooltipEl = document.querySelectorAll(".nav__tooltip")
const navLinkTextEls = document.querySelectorAll(".nav__link-text");
const horizontalRuleEl = document.querySelector(".horizontal-rule");
const addBookLinkEl = document.querySelector(".nav__add-book-link");
const bookCardsContainer = document.querySelector(".book-card-list");
const deleteAllBooksLinkEl = document.querySelector(".nav__delete-all-books-link");

// modals
const newBookModalEl = document.querySelector(".new-book__modal");
const newBookModalCloseBtn = document.querySelector(".new-book-modal__close-button");
const addBookBtn = document.querySelector('.new-book__add-book-btn');
const updateBookModalEl = document.querySelector(".update-book__modal");
const updateBookModalCloseBtn = document.querySelector(".update-book-modal__close-button");
const updateBookBtn = document.querySelector('.new-book__update-book-btn');
const deleteConfirmationModalEl = document.querySelector('.delete-confirmation-modal');
const deleteConfirmationModalCloseBtn = document.querySelector('.delete-confirmation-modal__close-button');
const confirmationModalConfirmBtn = document.querySelector('.delete-confirmation-modal__confirm-button');
const confirmationModalExitBtn = document.querySelector('.delete-confirmation-modal__exit-button');
const deleteAllModalEl = document.querySelector(".delete-all-modal");
const deleteAllModalCloseBtn = document.querySelector('.delete-all-modal__close-button');
const deleteAllModalCB = document.querySelector('.delete-all-modal__checkbox');
const deleteAllModalDeleteBtn = document.querySelector('.delete-all-modal__delete-button');

// forms
const addBookFormEl = document.querySelector(".add-new-book-form");
const formTitleInput = document.querySelector('.new-book__title-input');
const formAuthorInput = document.querySelector('.new-book__author-input');
const formCommentsInput = document.querySelector(".new-book__comments")
const updateBookFormEl = document.querySelector('.update-book-form');
const updateBookFormTitleInput = document.querySelector(".update-book__title-input");
const updateBookFormAuthorInput = document.querySelector(".update-book__author-input");
const updateBookFormCommentsInput = document.querySelector(".update-book__comments");

// other
const mainContainerEl = document.querySelector(".main-container");
const overlayEl = document.querySelector(".overlay");
const bookshelfContainer = document.querySelector(".bookshelf-container");
const alertEl = document.querySelector('.alert');
const bookIllustrationsLive = document.getElementsByClassName("book");
const bookCardsLive = document.getElementsByClassName('book-card');

let idOfBookToBeUpdated;
let bookIllustrationToRemove;
let bookCardToRemove;

// Event listeners

menuBtn.addEventListener("click", () => {
  toggleSidebarElements();
});

newBookModalCloseBtn.addEventListener("click", () => {
  hideElement(newBookModalEl, overlayEl);
});

updateBookModalCloseBtn.addEventListener('click', () => {
  hideElement(updateBookModalEl, overlayEl);
});

addBookFormEl.addEventListener("submit", addBookOnPage);
updateBookFormEl.addEventListener('submit', updateBook);

addBookLinkEl.addEventListener("click", function(){
  clearFormFields();
  //can't have more than 1 modal opened
  hideElement(updateBookModalEl, deleteConfirmationModalEl, deleteAllModalEl);
  showElement(newBookModalEl, overlayEl);
});

overlayEl.addEventListener("click", () => {
  // close all modals and the overlay itself
  hideElement( 
    newBookModalEl,
    updateBookModalEl,
    deleteConfirmationModalEl,
    deleteAllModalEl, 
    overlayEl
    );
});

deleteConfirmationModalCloseBtn.addEventListener('click', () => {
  hideElement(deleteConfirmationModalEl, overlayEl);
});

confirmationModalConfirmBtn.addEventListener('click', () => {
  hideElement(overlayEl, deleteConfirmationModalEl); 

  // delete elements from the page and reset the value of the variables
  bookIllustrationToRemove.remove();
  bookCardToRemove.remove(); 
  bookIllustrationToRemove = null;
  bookCardToRemove = null;
  showAlert('success', "Book removed!");
});

confirmationModalExitBtn.addEventListener('click', () => {
  hideElement(deleteConfirmationModalEl, overlayEl);
});

// deleteAllBooksLinkEl.addEventListener('click', () => {
  //   showElement();
  // })
  
deleteAllModalCB.addEventListener('click', () => {
  deleteAllModalDeleteBtn.classList.toggle('delete-button__allowed');
});

deleteAllModalCloseBtn.addEventListener('click', () => {
  hideElement(deleteAllModalEl, overlayEl);
});

deleteAllBooksLinkEl.addEventListener('click', () => {
  hideElement(newBookModalEl, updateBookModalEl, deleteConfirmationModalEl);
  
  if(bookIllustrationsLive.length === 0){
    showAlert('error', 'Nothing to delete!');
    return;
  }
  showElement(deleteAllModalEl, overlayEl);
});

deleteAllModalDeleteBtn.addEventListener('click', deleteAllBooks);

// Logic

function addBookOnPage(e){
  e.preventDefault();

  const title = formTitleInput.value;
  const author = formAuthorInput.value;
  const comments = formCommentsInput.value;

  addBookToUI(title, author, comments);
  showAlert("success", "New book added!");
  clearFormFields();

  if(!sidebar.classList.contains('sidebar--open'))
  setTimeout( () => {
    toggleSidebarElements();
  }, 100);
}

function updateBook(e){
  e.preventDefault();

  let bookCardToUpdate;
  let bookIllustrationToUpdate;

  for ( bookCard of bookCardsLive ){
    if(bookCard.id === idOfBookToBeUpdated){
      bookCardToUpdate = bookCard;
    }
  }

  for ( bookIllustration of bookIllustrationsLive ){
    if(bookIllustration.id === idOfBookToBeUpdated){
      bookIllustrationToUpdate = bookIllustration;
    }
  }
  
  let bookCardToUpdateFields = bookCardToUpdate.querySelectorAll("p");
  
  bookCardToUpdateFields[0].textContent = updateBookFormTitleInput.value;
  bookCardToUpdateFields[1].textContent = `by ${updateBookFormAuthorInput.value}`;
  bookCardToUpdateFields[2].textContent = updateBookFormCommentsInput.value;
  
  let bookIllustrationToUpdateFields = bookIllustrationToUpdate.querySelectorAll('h3');

  bookIllustrationToUpdateFields[0].textContent = updateBookFormTitleInput.value;
  bookIllustrationToUpdateFields[1].innerHTML = `<h3 class="book__author"><span class="book__by">${updateBookFormAuthorInput.value.length > 0 ? "by" : ""}</span> <br> ${updateBookFormAuthorInput.value}</h3>`;

  // turn off all modals
  hideElement(newBookModalEl, overlayEl, updateBookModalEl, deleteAllModalEl);

  idOfBookToBeUpdated = null;

  showAlert('update', "Book updated!");
}

function deleteOrUpdateBook(event){
  const elToUpdate = event.target.closest('.book-card');
  const elementId = elToUpdate.id;

  if(event.target.classList.contains("fa-xmark")){
    hideElement(newBookModalEl, updateBookModalEl, deleteAllModalEl);
    showElement(deleteConfirmationModalEl, overlayEl);

    for(let item of bookIllustrationsLive){
      if(item.id === elementId){
        bookIllustrationToRemove = item;
        break;
      }
    }
    bookCardToRemove = elToUpdate;

  }
  else if(event.target.classList.contains('fa-pen')){
    hideElement(newBookModalEl, deleteConfirmationModalEl, deleteAllModalEl);
    showElement(updateBookModalEl, overlayEl);

    idOfBookToBeUpdated = elementId;

    const bookCardData = elToUpdate.querySelectorAll("p");

    //update input values (should not be empty) and place caret at the end (default is beginning)
    updateBookFormTitleInput.value = `${bookCardData[0].textContent}`;
    updateBookFormTitleInput.setSelectionRange(-1, -1); 

    updateBookFormAuthorInput.value = `${bookCardData[1].textContent.slice(3)}`; // don't incldue "by " part
    updateBookFormAuthorInput.setSelectionRange(-1, -1);

    updateBookFormCommentsInput.value = `${bookCardData[2].textContent}`;
    updateBookFormCommentsInput.setSelectionRange(-1, -1);
  }
}

function generateUniqueId(){
  let timestamp = Date.now();
  let randomNumber = Math.floor(Math.random() * 10000);
  let id = `${timestamp}${randomNumber}`;
  return id;
}

function deleteAllBooks(){

  // need to loop from the end, as HTMLcollections are updated live and starting from the beginning will cause element skipping

  for(let i=bookIllustrationsLive.length-1; i>=0; i--){
    bookIllustrationsLive[i].remove();
  }

  for(let i=bookCardsLive.length-1; i>=0; i--){
    bookCardsLive[i].remove();
  }

  hideElement(deleteAllModalEl, overlayEl);
  showAlert('success', 'Removed all books!');
}
