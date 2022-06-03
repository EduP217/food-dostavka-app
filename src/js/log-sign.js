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

document.getElementById('formSignIn').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = e.target.querySelector('#uname').value;
    window.location.href = '/views/history.html?user='+username;
});