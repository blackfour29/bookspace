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

// modals
const newBookModalEl = document.querySelector(".new-book__modal");
const newBookModalCloseBtn = document.querySelector(".new-book-modal__close-button");
const addBookBtn = document.querySelector('.new-book__add-book-btn');
const updateBookModalEl = document.querySelector(".update-book__modal");
const updateBookModalCloseBtn = document.querySelector(".update-book-modal__close-button");
const updateBookBtn = document.querySelector('.new-book__update-book-btn');

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


// Event listeners

menuBtn.addEventListener("click", () => {
  toggleSidebarElements();
});

newBookModalCloseBtn.addEventListener("click", () => {
  hideElement(newBookModalEl);
  hideElement(overlayEl);
});

newBookModalCloseBtn.addEventListener('click', () => {
  hideElement(updateBookModalEl);
  hideElement(overlayEl);
});

updateBookModalCloseBtn.addEventListener('click', () => {
  hideElement(updateBookModalEl);
  hideElement(overlayEl);
});

addBookFormEl.addEventListener("submit", addBookOnPage);
updateBookFormEl.addEventListener('submit', updateBook);

addBookLinkEl.addEventListener("click", function(){
  clearFormFields();
  //can't have 2 modals opened at the same time
  hideElement(updateBookModalEl);
  showElement(newBookModalEl);
  showElement(overlayEl);
});

overlayEl.addEventListener("click", () => {
  if(!newBookModalEl.classList.contains("hidden")){
    hideElement(newBookModalEl);
    hideElement(overlayEl);
  }

  if(!updateBookModalCloseBtn.classList.contains("hidden")){
    hideElement(updateBookModalEl);
    hideElement(overlayEl);
  }
});

// Logic

function addBookOnPage(e){
  e.preventDefault();

  const title = formTitleInput.value;
  const author = formAuthorInput.value;
  const comments = formCommentsInput.value;

  addBookToUI(title, author, comments);
  showAlert("success", "New book added!");
  clearFormFields();
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
  hideElement(newBookModalEl);
  hideElement(overlayEl);
  hideElement(updateBookModalEl);

  idOfBookToBeUpdated = null;

  showAlert('update', "Book updated!");
}

function deleteOrUpdateBook(event){
  
  const elToUpdate = event.target.closest('.book-card');
  const elementId = elToUpdate.id;
  
  if(event.target.classList.contains("fa-xmark")){
    for(let item of bookIllustrationsLive){
      if(item.id === elementId){
        item.remove();
      }
    }
    elToUpdate.remove();
  }

  else if(event.target.classList.contains('fa-pen')){
    hideElement(newBookModalEl);
    showElement(updateBookModalEl);
    showElement(overlayEl);

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

