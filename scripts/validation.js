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
  const errorMsgElement = document.querySelector("#" + errorMsgId);
  errorMsgElement.textContent = inputErrorMessage;
};

const removeInputError = (formElement, inputElement, inputErrorMessage) => {
  const errorMsgId = inputElement.id + "-error";
  const errorMsgElement = document.querySelector("#" + errorMsgId);
  errorMsgElement.textContent = undefined;
  errorMsgElement.classList.add("modal__input-correct");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else if (inputElement.validity.valid) {
    removeInputError(formElement, inputElement, inputElement.validationMessage);
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
  } else if (!hasInvalidInput(inputList)) {
    buttonElement.classList.remove("modal__save-btn_inactive");
  }
};

// to check input state upon modal opening

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-btn");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Passing the configuration object to enableValidation when we call it.
// enableValidation(settings);
enableValidation();
