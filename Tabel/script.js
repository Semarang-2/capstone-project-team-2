// Function menu bar & feedback
const menuMini = document.querySelector('.menu-mini');
const menuList = document.querySelector('.nav-links');
menuMini.addEventListener("click", function () {
    menuMini.classList.toggle('change');
});

menuMini.addEventListener('click', function(){
    menuList.classList.toggle('hidden');
});

// Function feedback
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


// Data tables
$(document).ready(function () {
    $('#myTable').DataTable({
        'ajax': './Data-table.json',
        'columns': [
            { 'data': 'Transaction' },
            { 'data': 'Location' },
            { 'data': 'Machine' },
            { 'data': 'Product' },
            { 'data': 'Category' },
            { 'data': 'TransDate' },
            { 'data': 'Type' },
            { 'data': 'MQty' },
            { 'data': 'LineTotal' },
            { 'data': 'PrcdMonth' }

        ]
    });
});