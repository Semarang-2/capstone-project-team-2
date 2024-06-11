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

const btnRecommended = document.querySelectorAll('.btn-recommended');
    btnRecommended.forEach(function (e, index) {
        e.addEventListener('click', function (e) {
            const scale = this.parentElement.nextElementSibling;
            if (scale.style.display === 'none') {
                scale.style.display = 'block';
                e.textContent = 'Hide Text';
            } else {
                scale.style.display = 'none';
                e.textContent = 'Show Text';
            }
        });
    });

