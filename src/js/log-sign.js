var modal = document.getElementById('id01');
document.getElementById('openSignUpModal').addEventListener('click',function(event) {
    modal.classList.remove('hide');
});

document.getElementById('timesModal').addEventListener('click',function(event) {
    modal.classList.add('hide');
});

document.getElementById('closeModal').addEventListener('click',function(event) {
    modal.classList.add('hide');
});