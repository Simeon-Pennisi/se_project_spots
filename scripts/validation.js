// configuration object
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_inactive",
  inputErrorClass: "-error",
  errorClass: "modal__input-error",
};

const showInputError = (
  formElement,
  inputElement,
  inputErrorMessage,
  config = settings
) => {
  const errorMsgId = inputElement.id + config.inputErrorClass;
  const errorMsgElement = formElement.querySelector("#" + errorMsgId);
  errorMsgElement.textContent = inputErrorMessage;
  errorMsgElement.classList.add(config.errorClass);
};

const removeInputError = (formElement, inputElement, config) => {
  const errorMsgId = inputElement.id + "-error";
  const errorMsgElement = formElement.querySelector("#" + errorMsgId);
  errorMsgElement.textContent = "";
  errorMsgElement.classList.remove(config.errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else if (inputElement.validity.valid) {
    removeInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// const toggleErrorMessage = (inputList, errorMessage, config) => {
//   if (hasInvalidInput(inputList)) {
//     // showInputError(config.inactiveButtonClass);
//     // showInputError(formElement, inputElement, errorMessage, config);
//     removeInputError(formElement, inputElement, errorMessage);
//   }
//   // else if (!hasInvalidInput(inputList)) {
//   //   removeInputError(formElement, inputElement, errorMessage);
//   // }
// };

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
      // toggleErrorMessage(inputList, errorMessage, config);
    });
  });
};

function enableValidation(config = settings) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// original function
//
// function resetValidation(config = settings) {
//   const formList = document.querySelectorAll(config.formSelector);
//   formList.forEach((formElement) => {
//     checkInputValidity(formElement, config.inputSelector);
//   });
// }
//
// better version below

function resetValidation(formElement, inputList, config = settings) {
  inputList.forEach((input) => {
    removeInputError(formElement, input, config);
  });
}

enableValidation(settings);
