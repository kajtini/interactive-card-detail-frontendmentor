"use strict";

const cardNumber = document.querySelector(".card__number");
const cardUser = document.querySelector(".card__name");
const cardDate = document.querySelector(".card__date");
const cardCvc = document.querySelector(".card__cvc");
const inputContainer = document.querySelector(".user-inputs");
const confirmBtn = document.querySelector(".user-confirm-btn");
const cardMonth = document.querySelector(".card__month");
const cardYear = document.querySelector(".card__year");

const inputName = inputContainer.querySelector(".input--name");
const inputNumber = inputContainer.querySelector(".input--number");
const inputMonth = inputContainer.querySelector(".input--mm");
const inputYear = inputContainer.querySelector(".input--yy");
const inputCvc = inputContainer.querySelector(".input--cvc");

let regexName = /^([a-zA-Z]+)\ ([a-zA-Z]+)$/;
let regexNumber = /^([0-9]+){16}$/;
let regexMonthYear = /^([0-9]{1,})$/;
let regexCvc = /^([0-9]{3})$/;

let valid = false;

const formatCheckCardNumber = (number) => {
  if (inputNumber.value === "") {
    cardNumber.innerHTML === "0000000000000000";
  }
  const formattedNumberArr = cardNumber.innerHTML.match(/.{1,4}/g) || [];
  cardNumber.innerHTML = formattedNumberArr.join(" ");

  const error = inputNumber.nextElementSibling;
  if (!regexNumber.test(number)) {
    console.log(12);
    error.classList.remove("hidden");
    inputNumber.classList.add("user-input--wrong");
  }

  if (regexNumber.test(number)) {
    console.log(13);
    error.classList.add("hidden");
    inputNumber.classList.remove("user-input--wrong");
    valid = true;
  }
};

const checkName = (name) => {
  const errorMsg =
    inputContainer.querySelector(".input--name").nextElementSibling;
  if (!regexName.test(name)) {
    errorMsg.classList.remove("hidden");
    inputContainer
      .querySelector(".input--name")
      .classList.add("user-input--wrong");
  }

  if (regexName.test(name) && !errorMsg.classList.contains("hidden")) {
    errorMsg.classList.add("hidden");
    inputContainer
      .querySelector(".input--name")
      .classList.remove("user-input--wrong");
    valid = true;
  }
};

const checkMonth = (month) => {
  const errorMsg = inputMonth.parentNode.nextElementSibling;

  if (!regexMonthYear.test(month)) {
    errorMsg.classList.remove("hidden");
    inputMonth.classList.add("user-input--wrong");
  }

  if (regexMonthYear.test(month) && !errorMsg.classList.contains("hidden")) {
    errorMsg.classList.add("hidden");
    inputMonth.classList.remove("user-input--wrong");
    valid = true;
  }
};

const checkYear = (year) => {
  if (!regexMonthYear.test(year)) {
    inputYear.classList.add("user-input--wrong");
  }

  if (regexMonthYear.test(year)) {
    inputYear.classList.remove("user-input--wrong");
    valid = true;
  }
};

const checkCvc = (cvc) => {
  const errorMsg = inputCvc.nextElementSibling;
  if (!regexCvc.test(cvc)) {
    errorMsg.classList.remove("hidden");
    inputCvc.classList.add("user-input--wrong");
  }

  if (regexCvc.test(cvc)) {
    errorMsg.classList.add("hidden");

    inputCvc.classList.remove("user-input--wrong");
    valid = true;
  }
};

inputContainer.addEventListener("input", function (e) {
  if (e.target.classList.contains("input--name")) {
    let nameText = e.target.value;

    cardUser.innerHTML = nameText;
  }

  if (e.target.classList.contains("input--number")) {
    let number = e.target.value;

    if (e.target.value === "") {
      number = "0000 0000 0000 0000";
    }

    cardNumber.innerHTML = number;
  }

  if (e.target.classList.contains("input--cvc")) {
    let cvc = "";
    cvc = e.target.value;
    cardCvc.innerHTML = cvc;
  }
  if (e.target.classList.contains("input--mm")) {
    if (e.target.value > 12) {
      e.target.value = "12";
    }
    let mm = e.target.value;
    cardMonth.innerHTML = mm;
    if (mm === "") {
      cardMonth.innerHTML = "00";
    }
  }
  if (e.target.classList.contains("input--yy")) {
    let yy = e.target.value;
    cardYear.innerHTML = yy;
    if (yy === "") {
      cardYear.innerHTML = "00";
    }
  }
});

confirmBtn.addEventListener("click", function () {
  checkName(inputContainer.querySelector(".input--name").value);
  formatCheckCardNumber(cardNumber.innerHTML);
  checkMonth(inputMonth.value);
  checkYear(inputYear.value);
  checkCvc(inputCvc.value);
  if (valid) {
    inputContainer.parentElement.classList.add("hidden");
    inputContainer.parentElement.nextElementSibling.classList.remove("hidden");
  }
});
