let myLibrary = [];

function Book(){
  
}

function addBookToLibrary(){
  
}

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu__icon");
const logoIconEl = document.querySelector(".sidebar__logo");
const logoNameEl = document.querySelector(".sidebar__title");
const navTooltipEl = document.querySelectorAll(".nav__tooltip")
const navLinkTextEls = document.querySelectorAll(".nav__link-text");
const mainContainerEl = document.querySelector(".main-container");
const horizontalRuleEl = document.querySelector(".horizontal-rule");
const bookItemEl = document.querySelector(".book-item");
const addBookLinkEl = document.querySelector(".nav__add-book-link");
const overlayEl = document.querySelector(".overlay");
const modalEl = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close-button");
const addBookBtn = document.querySelector('.new-book__add-book-btn');
const formTitleInput = document.querySelector('.new-book__title-input');
const formAuthorInput = document.querySelector('.new-book__author-input');
const formEl = document.querySelector(".add-new-book-form");
const bookshelfContainer = document.querySelector(".bookshelf-container");


menuBtn.addEventListener("click", () => {

  toggleSidebar();
  toggleTooltips();
  toggleLogo();
  toggleMenuBtn();
  toggleNavLinkTextEls();
  toggleMainContainerWidth();
  toggleHorizontalRule();

  bookItemEl.classList.remove("hidden");
  bookItemEl.classList.toggle("invisible");
  if(bookItemEl.classList.contains("invisible")){
    bookItemEl.classList.add("hidden");
    setTimeout( () => {
      bookItemEl.classList.remove("hidden");
    }, 1);
  }
});

modalCloseBtn.addEventListener("click", () => {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
});

formEl.addEventListener("submit", addBookOnPage);




function toggleMenuBtn() {
 if(sidebar.classList.contains("sidebar--open")){
   menuBtn.classList.replace("fa-bars", "fa-xmark");//replacing the iocns class
 }else {
   menuBtn.classList.replace("fa-xmark","fa-bars");//replacing the iocns class
 }
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

function toggleTooltips(){
  navTooltipEl.forEach ( (tooltip) => {
    tooltip.classList.toggle("hidden");
  })
}

function toggleSidebar(){
  sidebar.classList.toggle("sidebar--open");
}

function toggleNavLinkTextEls(){
  navLinkTextEls.forEach(el => {
    if(el.style.opacity == 0){
      el.style.opacity = 1;
      el.style.pointerEvents = "auto";
    }
    else{
      el.style.opacity = 0;
      el.style.pointerEvents = "none";
    }
  })
}

function toggleMainContainerWidth(){
  mainContainerEl.classList.toggle("main-container-reduced");
}

function toggleHorizontalRule(){
  horizontalRuleEl.classList.toggle("invisible");
}

addBookLinkEl.addEventListener("click", function(){
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
});

overlayEl.addEventListener("click", () => {
  if(!modalEl.classList.contains("hidden")){
    modalEl.classList.add("hidden");
    overlayEl.classList.add("hidden");
  }
})

function addBookOnPage(e){
  e.preventDefault();
  console.log(bookshelfContainer);
  const title = formTitleInput.value;
  const author = formAuthorInput.value;
  let htmlEl = document.createElement('div');
  overlayEl.classList.add("hidden");
  modalEl.classList.add("hidden");
  
  htmlEl.classList.add('book');
  
  htmlEl.innerHTML = `
  <div class="book__data">
  <h3 class="book__title">${title}</h3>
  <h4 class="book__author"><span class="book__by">${author.length > 0 ? "by" : ""}</span> <br> ${author}</h4>
      </div>
      `;
  // let bookNode = document.createTextNode(htmlEl);
      
  bookshelfContainer.appendChild(htmlEl);

}