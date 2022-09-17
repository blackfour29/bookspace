function toggleSidebarElements(){
  toggleSidebar();
  toggleTooltips();
  toggleLogo();
  toggleMenuBtn();
  toggleNavLinkTextEls();
  toggleMainContainerWidth();
  toggleHorizontalRule();
  toggleBookCardVisibility();
  toggleBookCardListScrollbar();
}


function toggleSidebar(){
  sidebar.classList.toggle('sidebar--open');
}
 
function toggleTooltips(){
  navTooltipEl.forEach ( (tooltip) => {
    tooltip.classList.toggle('hidden');
  })
}

function toggleLogo(){
  if(logoIconEl.style.opacity == 0 && logoNameEl.style.opacity == 0 ){
    logoIconEl.style.opacity = 1;
    logoNameEl.style.opacity = 1;
  }
  else{
    logoIconEl.style.opacity = 0;
    logoNameEl.style.opacity = 0;
  }
}

function toggleMenuBtn() {
  if(sidebar.classList.contains('sidebar--open')){
    menuBtn.classList.replace('fa-bars', 'fa-xmark');
  }else {
    menuBtn.classList.replace('fa-xmark','fa-bars');
  }
}

function toggleNavLinkTextEls(){
  navLinkTextEls.forEach(el => {
    if(el.style.opacity == 0){
      el.style.opacity = 1;
      el.style.pointerEvents = 'auto';
    }
    else{
      el.style.opacity = 0;
      el.style.pointerEvents = 'none';
    }
  })
}

function toggleMainContainerWidth(){
  mainContainerEl.classList.toggle('main-container-reduced');
}

function toggleHorizontalRule(){
  horizontalRuleEl.classList.toggle('invisible');
}

function toggleBookCardVisibility(){
  
  for (let card of bookCardsLive) {
    card.classList.remove('hidden');
    card.classList.toggle('invisible');
    
    if(card.classList.contains('invisible')){
      card.classList.add('hidden');
      setTimeout( () => {
        card.classList.remove('hidden');
      }, 1);
    }
  }
} 

function toggleBookCardListScrollbar(){
  // if there are more than a few book cards in the list, they will have a scrollbar even if the sidebar is hidden. This function fixes that
  // need a short delay so the scrollbar doesn't appear instantly
    if(bookCardListEl.style.overflowY === 'auto'){
      setTimeout( () => {
        bookCardListEl.style.overflowY = 'hidden';
      }, 10); // basically instant
    }
    else if(bookCardListEl.style.overflowY === 'hidden'){
      setTimeout( () => {
        bookCardListEl.style.overflowY = 'auto';
      }, 300);
    }
}

function showAlert(type, message){
  // create the alert element
  let alert = document.createElement('div');
  alert.classList.add('alert');
  alert.classList.add(`alert__${type}`);
  alert.textContent = `${message}`;
  alert.style.opacity = 0;

  // add it to the DOM
  alertContainer.appendChild(alert);

  // alert entering
  setTimeout( () => {
    alert.style.transform = 'translateX(-330px)';
    alert.style.opacity = 1;
  })

  // alert leaving
  setTimeout( () => {
    alert.style.transform = 'translateX(450px)';
    alert.style.opacity = 0;
  }, 2500);

  // alert removing
  setTimeout( () => {
    alert.remove();
  }, 3000);

}

function clearFormFields(){
  formTitleInput.value = '';
  formAuthorInput.value = '';
  formCommentsInput.value = '';
}

function showElement(...elementsToDisplay){
  elementsToDisplay.forEach(element => {
    element.classList.remove('hidden');
  })
}

function hideElement(...elementsToHide){
  elementsToHide.forEach(element => {
    element.classList.add('hidden');
  })
}

function addBookToUI(title, author, comments, bookId){
  hideElement(overlayEl);
  hideElement(newBookModalEl);
  
  // create the elements
  let bookIllustrationEl = document.createElement('div');
  bookIllustrationEl.classList.add('book');
  
  bookIllustrationEl.innerHTML = `
  <div class="book__data">
    <h3 class="book__title">${title}</h3>
    <h3 class="book__author"><span class="book__by">${author.length > 0 ? "by" : ""}</span><br>${author}</h3>
  </div>
      `;
  
  let bookCardEl = document.createElement('div');
  bookCardEl.classList.add('book-card');
  
  bookCardEl.innerHTML = `
  <p class="book-card__title">${title}</p>
  <p class="book-card__author"><span>${author.length > 0 ? "by" : ""}</span> ${author}</p>
  <p class="book-card__comments">${comments}</p>
  <div class="book-card__buttons">
  <i class="fa-solid fa-pen book-card__icon book-card__edit-icon"></i>
  <i class="fa-solid fa-xmark book-card__icon "></i>
  </div>
  `
  
  bookIllustrationEl.setAttribute('id', bookId);
  bookCardEl.setAttribute('id', bookId);
  
  // append the create elements
  bookCardsContainer.appendChild(bookCardEl);
  bookshelfContainer.appendChild(bookIllustrationEl);
  
  // open sidebar to show that the book-card was added
  if(!sidebar.classList.contains("sidebar--open")){
    bookCardEl.classList.add('invisible');
  }

  // add event listener on the book card so it can be edited or deleted
  bookCardEl.addEventListener("click", deleteOrUpdateBook);
}

function renderStoredData(storedData){
  storedData.forEach( bookEntry => {
    console.log(bookEntry);
    bookLibrary.push(bookEntry);
     addBookToUI(bookEntry.bookData[0], bookEntry.bookData[1], bookEntry.bookData[2], bookEntry.elementId);
  })
}