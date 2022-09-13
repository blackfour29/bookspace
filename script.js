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

menuBtn.addEventListener("click", ()=>{

  toggleSidebar();
  toggleTooltips();
  toggleLogo();
  toggleMenuBtn();
  toggleNavLinkTextEls();
  toggleMainContainerWidth();
});

function toggleMenuBtn() {
 if(sidebar.classList.contains("open")){
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