// consts
const formElement = document.querySelector(".modal__form");
const formInput = formElement.querySelector(".modal__input");

// objects
// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// functions
const showInputError = (formElement, inputElement, inputErrorMessage) => {
  const errorMsgId = inputElement.id + "-error";
  // console.log("the error message is", errorMsgId);
  const errorMsgElement = document.querySelector("#" + errorMsgId);
  errorMsgElement.textContent = inputErrorMessage;
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    // console.log(inputElement.validationMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__save-btn_inactive");
  } else {
    buttonElement.classList.remove("modal__save-btn_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-btn");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      // checkInputValidity(inputList, buttonElement);
      // checkValidity(inputList, buttonElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // const formList = Array.from(document.querySelectorAll(".modal__form"));
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    // formElement.addEventListener("submit", (evt) => {
    //   console.log(formElement);
    //   evt.preventDefault();
    // });
    setEventListeners(formElement);
  });
};

// Passing the configuration object to enableValidation when we call it.
// enableValidation(settings);
enableValidation();
