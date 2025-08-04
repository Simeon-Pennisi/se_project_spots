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

const removeInputError = (formElement, inputElement, inputErrorMessage) => {
  const errorMsgId = inputElement.id + "-error";
  const errorMsgElement = document.querySelector("#" + errorMsgId);
  errorMsgElement.textContent = undefined;
  errorMsgElement.classList.add("modal__input-correct");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    // console.log(inputElement.validationMessage);
  } else if (inputElement.validity.valid) {
    removeInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    // console.log(inputElement.validity.valid);
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // use the following line to remove error messages
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

// delete all below this line

// if (a - b > 0) {
//   if (a - b <= 0 + margin) {
//     return 0;
//   } else if (a < b) {
//     return -1;
//   } else if (a > b) {
//     return 1;
//   }
// } else if (a - b < 0) {
//   if (a - b >= 0 - margin) {
//     return 0;
//   } else if (a < b) {
//     return -1;
//   } else if (a > b) {
//     return 1;
//   }
// }

// function closeCompare(a, b, margin) {
//   if (margin === undefined) {
//     margin = 0;
//   }

//   if (a - b > 0) {
//     if (a - b <= 0 + margin) {
//       return 0;
//     } else if (a < b) {
//       return -1;
//     } else if (a > b) {
//       return 1;
//     }
//   } else if (a - b < 0) {
//     if (a - b >= 0 - margin) {
//       return 0;
//     } else if (a < b) {
//       return -1;
//     } else if (a > b) {
//       return 1;
//     }
//   }
// }

// function closeCompare(a, b, margin) {
//   if (a - b > 0) {
//     if (a - b <= 0 + margin) {
//       let answer = 0;
//     } else if (a < b) {
//       let answer = -1;
//     } else if (a > b) {
//       let answer = 1;
//     }
//   } else if (a - b < 0) {
//     if (a - b >= 0 - margin) {
//       let answer = 0;
//     } else if (a < b) {
//       let answer = -1;
//     } else if (a > b) {
//       let answer = 1;
//     }
//   }
//   if (answer === undefined) {
//     let answer = 0;
//   }
//   return answer;
// }

// function closeCompare(a, b, margin) {
//   if (a - b > 0) {
//     if (a - b <= 0 + margin?.value) {
//       return 0;
//     } else if (a < b) {
//       return -1;
//     } else if (a > b) {
//       return 1;
//     } else {
//       return 0;
//     }
//   } else if (a - b < 0) {
//     if (a - b >= 0 - margin?.value) {
//       return 0;
//     } else if (a < b) {
//       return -1;
//     } else if (a > b) {
//       return 1;
//     } else {
//       return 0;
//     }
//   }
// }
