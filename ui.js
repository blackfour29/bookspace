function toggleSidebarElements(){
  toggleSidebar();
  toggleTooltips();
  toggleLogo();
  toggleMenuBtn();
  toggleNavLinkTextEls();
  toggleMainContainerWidth();
  toggleHorizontalRule();
  toggleBookCardVisibility();
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


function showAlert(type, message){
  if(type === 'success'){
    alertEl.style.right='50px';
    alertEl.style.opacity = 1;
    alertEl.textContent = `${message}`;
    alertEl.classList.add(`alert__${type}`)
  }
  else if(type === 'update'){
    alertEl.style.right = '50px'
    alertEl.style.opacity = 1;
    alertEl.classList.add(`alert__${type}`)
    alertEl.textContent = `${message}`;
  }
  
  removeAlert();
}

function removeAlert(){
  setTimeout( () => {
    alertEl.style.right = '-250px';
    alertEl.style.opacity = 0;
  }, 3000);
}

function clearFormFields(){
  formTitleInput.value = '';
  formAuthorInput.value = '';
  formCommentsInput.value ='';
}

function showElement(elementToBeDisplayed){
  elementToBeDisplayed.classList.remove('hidden');
}

function hideElement(elementToBeHidden){
  elementToBeHidden.classList.add('hidden');
}

function addBookToUI(title, author, comments){
  let bookIllustrationEl = document.createElement('div');
  hideElement(overlayEl);
  hideElement(newBookModalEl);
  
  bookIllustrationEl.classList.add('book');
  
  bookIllustrationEl.innerHTML = `
  <div class="book__data">
    <h3 class="book__title">${title}</h3>
    <h3 class="book__author"><span class="book__by">${author.length > 0 ? "by" : ""}</span><br>${author}</h3>
  </div>
      `;
  
  let bookCardEl = document.createElement('div');
  bookCardEl.classList.add('book-card');

  if(!sidebar.classList.contains("sidebar--open")){
    bookCardEl.classList.add('invisible');
  }


  bookCardEl.innerHTML = `
    <p class="book-card__title">${title}</p>
    <p class="book-card__author"><span>${author.length > 0 ? "by" : ""}</span> ${author}</p>
    <p class="book-card__comments">${comments}</p>
    <div class="book-card__buttons">
      <i class="fa-solid fa-pen book-card__icon book-card__edit-icon"></i>
      <i class="fa-solid fa-xmark book-card__icon "></i>
    </div>
  `

  let bookId = generateUniqueId();

  bookIllustrationEl.setAttribute('id', bookId);
  bookCardEl.setAttribute('id', bookId);

  bookCardsContainer.appendChild(bookCardEl);
  bookshelfContainer.appendChild(bookIllustrationEl);

  bookCardEl.addEventListener("click", deleteOrUpdateBook);
}