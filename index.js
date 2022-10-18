const form = document.querySelector(".sign-up-form");
const first = document.querySelector("#first-name");
const last = document.querySelector("#last-name");
const email = document.querySelector("#email");
const phoneField = document.querySelector("#phone");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");
const submit = document.querySelector("button");
const elementsToVerify = [first, last, email, phoneField, username, password];

const testButt = document.querySelector('#test');

const errorDiv = document.querySelector(".error-message");
const agree = document.querySelector("#agree");

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

submit.disabled = true;
confirmPassword.invalid = false;


agree.addEventListener("click", checkIfAgreed);
confirmPassword.addEventListener("focus", turnOnCheck);
form.addEventListener("click", activateSubmit);
agree.addEventListener('click', checkAllThings);
// form.addEventListener('submit', checkAllThings);
// test.addEventListener('click', checkAllThings);
// test.disabled = false;

// ********************* things to check ******************
let noBlanks = false;
let validPhoneNumber = false;
let userLengthIsOk = false;
let passwordLengthIsOk = false;
let passwordsMatch = false;
let userAgreed = false;


phoneField.addEventListener("input", checkIfValidPhoneNumber);

//****************general check for blanks, validity, length **********************
function checkAllThings(){
    for (let element of elementsToVerify){
        clearErrorMessage(element);
    }
    noBlanks = checkForBlankFields();
    validPhoneNumber = checkIfValidPhoneNumber();
    userLengthIsOk = checkInputLength(username);
    passwordLengthIsOk = checkInputLength(password);
}
function checkForBlankFields() {
    let noBlankFields = true;
  for (let element of elementsToVerify) {
    if (element.validity.valueMissing) {
      const missingField = element.previousElementSibling.textContent.toLowerCase(); //previousElementsibling is label
      const errorMessage = `Please enter a ${missingField}`;
      noBlankFields = false;
      addErrorMessage(element, errorMessage); //nextElementSibling is span below input
    }
  }
  if (noBlankFields === true){
    return true;
  } else {
    return false;
  }
}

function checkIfValidPhoneNumber() {
    // console.log(phoneField.validity);
  if (phoneField.validity.valid) {
    clearErrorMessage(phoneField);
    return true;
  } else {
    const errorMessage = `Invalid phone number`;
    addErrorMessage(phoneField, errorMessage);
    return false;
  }
}
function checkInputLength(target){

    const fieldName = target.previousElementSibling.textContent;
    let errorMessage;
    if (target.validity.tooLong){
        errorMessage = `${fieldName} is too long`;
        addErrorMessage(target, errorMessage);
        return false;
    } else if (target.validity.tooShort){
        errorMessage = `${fieldName} is too short`;
        addErrorMessage(target, errorMessage);
        return false;
    } else{ 
        return true;
    }
}

// ********* add or remove error message from next sibling (span) of input ******
function clearErrorMessage(target) {
  target.nextElementSibling.textContent = "";
}
function addErrorMessage(target, message) {
  target.nextElementSibling.textContent = message;
}

// ************************* checkbox validation ****************************
function checkIfAgreed() {
  if (agree.checked === true) {
    userAgreed = true;
  } else {
    userAgreed = false;
    console.log(agree.checked);
  }
}

// ******************* handle password inputs **************************
function turnOnCheck() {
  confirmPassword.addEventListener("keyup", checkPasswordMatch);
  // console.log('confirmPassword in focus')
}

function checkPasswordMatch() {
  let passwordInput = password.value;
  let confirmInput = confirmPassword.value;
  // console.log(passwordInput);
  // console.log(confirmInput);

  if (passwordInput !== confirmInput) {
    addPasswordErrorMessage();
  } else if (passwordInput === confirmInput) {
    passwordsMatch = true;
    removePasswordErrorMessage();
  }
}
function addPasswordErrorMessage() {
  let currentErrorText = errorDiv.querySelector("p");
  // console.log(currentErrorText);
  // confirmPassword.invalid = true;
  if (!currentErrorText) {
    let errorText = document.createElement("p");
    errorText.classList.add("error");
    errorText.textContent = "Passwords do not match";
    errorDiv.appendChild(errorText);
  }
}
function removePasswordErrorMessage() {
  let currentErrorText = errorDiv.querySelector("p");
  try {
    errorDiv.removeChild(currentErrorText);
  } catch (e) {
    console.log(e);
  }
}

function activateSubmit() {

    console.log(noBlanks, validPhoneNumber, userLengthIsOk, passwordLengthIsOk, passwordsMatch, userAgreed);
  if (userAgreed && passwordsMatch && userLengthIsOk && passwordLengthIsOk && validPhoneNumber && noBlanks) {
    submit.disabled = false;
  }
}
// let noBlanks = false;
// let validPhoneNumber = false;
// let fieldLengthIsOk = false;
// let passwordsMatch = false;
// let userAgreed = false;