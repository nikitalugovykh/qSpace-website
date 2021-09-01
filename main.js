// Burger header toggle
const header = document.querySelector('.header');
const header__burger = document.querySelector('.header__burger');
const menu_header = document.querySelector('.menu_header');
const body = document.body;

header__burger.addEventListener('click', function() {
    menu_header.classList.toggle('menu_visible');
    header__burger.classList.toggle('active');
    body.classList.toggle('lock');
})

let didScroll;
let lastScrollTop = 0;
let delta = 15;
let navbarHeight = header.offsetHeight;

window.addEventListener('scroll', function(event) {
  didScroll = true;

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
    // 
      let st = window.pageYOffset;
      
      let documentHeight = Math.max (
        document.body.scrollHeight, document.documentElement.scrollHeight, 
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      )
      let windowHeight = document.documentElement.clientHeight

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta){
          return;
      }
      
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          header.classList.remove('nav-down');
          header.classList.add('nav-up');
      } else {
          // Scroll Up
          if(st + windowHeight < documentHeight) {
              header.classList.remove('nav-up');
              header.classList.add('nav-down');
          }
      }
      
      lastScrollTop = st;
    }
});

// Slider

const slider = document.querySelector('.slider');
const circleInfo = document.querySelector('.circle-info');
const circleInfo__item = document.querySelectorAll('.circle-info__item');



let catalogSlider = null;
let mediaQuerySize = 1024;

function catalogSliderInit () {
  if (!catalogSlider) {
    catalogSlider = new Swiper(".mySwiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

function catalogSliderDestroy () {
  if (catalogSlider) {
    catalogSlider.destroy();
    catalogSlider = null;
  }
}

function checkWidth( width ) {
  if (window.innerWidth <= width) {

      slider.classList.add('swiper-container');
      circleInfo.classList.add('swiper-wrapper');
      circleInfo__item.forEach(item => item.classList.add('swiper-slide'));
      catalogSliderInit()
  }
  else {
   

      slider.classList.remove('swiper-container');
      circleInfo.classList.remove('swiper-wrapper');
      circleInfo__item.forEach(item => item.classList.remove('swiper-slide'));

      catalogSliderDestroy()
  }
}

checkWidth( mediaQuerySize );

window.addEventListener('resize', function(){
  checkWidth( mediaQuerySize );
}, false );



// Underline of preTitle styling
const content__preTitle_intro = document.querySelector('.content__preTitle_intro');
const content__preTitle_goals = document.querySelector('.content__preTitle_goals');

let mediaQuerySizeMobile = 425;

window.addEventListener('resize', function(){
  if (window.innerWidth <= mediaQuerySizeMobile) {
    content__preTitle_intro.classList.add('content__preTitle_yellow-col');
    content__preTitle_goals.classList.add('content__preTitle_blue-col');
  } else {
    content__preTitle_intro.classList.remove('content__preTitle_yellow-col');
    content__preTitle_goals.classList.remove('content__preTitle_blue-col');
  }
});



// Card active change color

const spaces__item = document.querySelectorAll('.spaces__item');
const spaces__items = document.querySelector('.spaces__items')


spaces__item.forEach(item => item.addEventListener('click', function (event) {

  let btn = event.currentTarget.lastElementChild.children[0];

  for( let item of event.currentTarget.parentElement.children) {
    let btn = item.lastElementChild.children[0];
    if (item.classList.contains('spaces__item_active')) {
      item.classList.remove('spaces__item_active');
      btn.classList.remove('btn__spases_active');
      btn.children[0].classList.remove('arrow_active')
    }
  }

  if(!event.currentTarget.classList.contains('spaces__item_active')) {
    event.currentTarget.classList.add('spaces__item_active');
    btn.classList.add('btn__spases_active');
    btn.children[0].classList.add('arrow_active');
  }   
  else {
    event.currentTarget.classList.remove('spaces__item_active');
    btn.classList.remove('btn__spases_active');
    btn.children[0].classList.remove('arrow_active');
  }

}));

spaces__items.addEventListener('mouseover', function (event){
  event.currentTarget.children[0].style.animation = 'none';
})

// Scroll to Menu Item
let scrollOffset = window.pageYOffset;

let introHeight = document.querySelector('.intro').clientHeight;
// const header = document.querySelector('.header');

const dataScroll = document.querySelectorAll('[data-scroll]');
dataScroll.forEach(item => {
  
  item.addEventListener('click', function(e) {
    e.preventDefault();
    let blockId = Object.values(e.target.dataset).join(); 
    let blockOffset = document.querySelector(blockId);
    let st = window.pageYOffset;

    blockOffset.scrollIntoView(
      {
        behavior: "smooth"
      });


    header.classList.remove('nav-up');
    header.classList.add('nav-down');
    menu_header.classList.remove('menu_visible');
    header__burger.classList.remove('active');
    body.classList.remove('lock');

    lastScrollTop = st + 5000;
  })
})

// input cleaning

const footerForm = document.querySelector('.footer-form');
const footerForm__mail = document.querySelector('.footer-form__mail');
const footerForm__btn = document.querySelector('.footer-form__btn');

footerForm.addEventListener('submit', function(event) {
  event.preventDefault()
  footerForm__mail.value = '';
})