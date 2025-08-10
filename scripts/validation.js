// configuration object
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_inactive",
  inputErrorClass: "-error",
  // errorClass: "modal__error_visible", //modal__input-error
  errorClass: "modal__input-error",
};

// functions
const showInputError = (
  formElement,
  inputElement,
  inputErrorMessage,
  config
) => {
  if (config != undefined) {
    const errorMsgId = inputElement.id + config.inputErrorClass;
    const errorMsgElement = document.querySelector("#" + errorMsgId);
    errorMsgElement.textContent = inputErrorMessage;
    // test line below
    errorMsgElement.classList.add(config.errorClass);
  } else {
    config = settings;
    const errorMsgId = inputElement.id + config.inputErrorClass;
    const errorMsgElement = document.querySelector("#" + errorMsgId);
    errorMsgElement.textContent = inputErrorMessage;
    // test line below
    errorMsgElement.classList.add(config.errorClass);
  }
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

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else if (!hasInvalidInput(inputList)) {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

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
    });
  });
};

function enableValidation(config) {
  if (config != undefined) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  } else {
    config = settings;
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
  }
}

enableValidation(settings);
