const form = document.querySelector('.sign-up-form');
const submit = document.querySelector('button');
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");
const errorDiv = document.querySelector('.error-message');
const agree = document.querySelector('#agree');


submit.disabled = true;
confirmPassword.invalid = false;
let passwordsMatch = false;
let userAgreed = false;

agree.addEventListener('click', checkIfAgreed);
confirmPassword.addEventListener('focus', turnOnCheck);
form.addEventListener('click', activateSubmit);

function turnOnCheck() {
    confirmPassword.addEventListener('keyup', checkPasswordMatch);
    console.log('confirmPassword in focus')
}
function checkIfAgreed() {
    if (agree.checked === true) {
        userAgreed = true;
    } else {
        userAgreed = false;
        console.log(agree.checked);
    }
}
function checkPasswordMatch() {
    let passwordInput = password.value;
    let confirmInput = confirmPassword.value;
    console.log(passwordInput);
    console.log(confirmInput);

    if (passwordInput !== confirmInput) {
        addPasswordErrorMessage();
    } else if (passwordInput === confirmInput) {
        passwordsMatch = true;
        removePasswordErrorMessage();
    }
}
function addPasswordErrorMessage() {
    let currentErrorText = errorDiv.querySelector('p');
    console.log(currentErrorText);
    // confirmPassword.invalid = true;
    if (!currentErrorText) {
        let errorText = document.createElement('p');
        errorText.classList.add('error');
        errorText.textContent = "Passwords do not match";
        errorDiv.appendChild(errorText);
    }
}
function removePasswordErrorMessage(){
    let currentErrorText = errorDiv.querySelector('p');
    errorDiv.removeChild(currentErrorText);
}
function activateSubmit() {
    if (userAgreed && passwordsMatch) { submit.disabled = false; }
}