// Function menu bar & feedback
const menuMini = document.querySelector('.menu-mini');
const menuList = document.querySelector('.nav-links');
menuMini.addEventListener("click", function () {
    menuMini.classList.toggle('change');
});

menuMini.addEventListener('click', function(){
    menuList.classList.toggle('hidden');
});

const clsFeedback = document.getElementById('close-feedback');
const feedback = document.querySelector('.feedback');
const overlayFeedback = document.querySelector('.overlay-feedback');
const opnFeedback = document.getElementById('open-feedback')

clsFeedback.addEventListener('click', function(){
    feedback.style.display = 'none';
    overlayFeedback.style.display = 'none';
});

opnFeedback.addEventListener('click', function(){
    feedback.style.display = 'block';
    overlayFeedback.style.display = 'block';
});




//animasi ease in - ease out pada bagian about
function scrollHandler() {
  var aboutSection = document.getElementById("about");
  var textElements = aboutSection.getElementsByClassName("animated");
  

  var bounding = aboutSection.getBoundingClientRect();
  if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
    for (var i = 0; i < textElements.length; i++) {
      textElements[i].classList.add("show");
    }
  } else {

    for (var i = 0; i < textElements.length; i++) {
      textElements[i].classList.remove("show");
    }
  }
}

window.addEventListener("scroll", scrollHandler);

window.addEventListener("DOMContentLoaded", scrollHandler);

//efek scrolling ketika memencet button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('startnow').addEventListener('click', function(event) {
    event.preventDefault();
    smoothScrollTo(document.querySelector('#about'));
    window.location.href = 'Dashboard/index.html';
  });
});

function smoothScrollTo(target) {
  const startPosition = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top;
  const distance = targetPosition - startPosition;
  const duration = 500;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
//warna navbar berubah ngikutin halaman 
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('.menu li a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLi.forEach(li => {
      li.classList.remove('active');
      if (li.getAttribute('href').includes(current)) {
        li.classList.add('active');
      }
    });
    if (window.scrollY === 0) {
      navLi.forEach(li => li.classList.remove('active'));
    }
  });
});
