import "./index.css";
// test comment line
import {
  enableValidation,
  resetValidation,
  settings,
  toggleButtonState,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "db75981d-07ca-4023-b69b-008231c3f1fd",
    "Content-Type": "application/json",
  },
});

// api
//   .getInitialCards()
//   .then((data) => {
//     console.log(data); // log the received data
//     data.forEach((element) => {
//       const cardElem = getCardElement(element);
//       cardsList.append(cardElem);
//     });
//   })
//   .catch((err) => {
//     console.error(err); // log the error if the request fails
//   });

api
  .getApplicationInfo()
  .then(([data, userInfo]) => {
    console.log("Cards Data:", data);
    console.log("User Info:", userInfo);
    const profileNameElement = document.querySelector(".profile__name");
    const profileDescriptionElement = document.querySelector(
      ".profile__description"
    );
    const profileAvatarElement = document.querySelector(".profile__avatar");

    // set the img `src` so the <img class="profile__avatar" /> updates correctly
    profileAvatarElement.src = userInfo.avatar;
    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    data.forEach((element) => {
      const cardElem = getCardElement(element);
      cardsList.append(cardElem);
    });
  })
  .catch((err) => {
    console.error("Error fetching application info:", err);
  });

// const initialCards = [
//   {
//     // example card
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },

//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },

//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },

//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },

//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },

//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },

//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },

//   {
//     // additional card
//     name: "a person stacking rocks on top of each other",
//     link: "https://unsplash.com/photos/a-person-stacking-rocks-on-top-of-each-other-RFFzlqBSmRw",
//   },
// ];

// keep an eye on this line
enableValidation(settings);

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

//open & closing functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  listenForEscape();
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  stopListeningForEscape();
}

//edit profile modal
const editProfileModal = document.querySelector("#profile-edit-modal");

const editProfileButton = document.querySelector(".profile__edit-button");

const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const editProfileBackground =
  editProfileModal.querySelector(".modal-background");

const editProfileNameInput = document.querySelector("#profile-name-input");

const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileNameElement = document.querySelector(".profile__name");

const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const editProfileForm = editProfileModal.querySelector(".modal__form");

// submission function
function submitEditProfileModal(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((updatedUserInfo) => {
      profileNameElement.textContent = updatedUserInfo.name;
      profileDescriptionElement.textContent = updatedUserInfo.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    });
  // profileNameElement.textContent = editProfileNameInput.value;
  // profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  // closeModal(editProfileModal);
}

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
});

editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);

editProfileBackground.addEventListener("click", () =>
  closeModal(editProfileModal)
);

editProfileForm.addEventListener("submit", submitEditProfileModal);

//new post modal
const newPostModal = document.querySelector("#post-new-modal");

const newPostButton = document.querySelector(".profile__add-button");

const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const newPostBackground = newPostModal.querySelector(".modal-background");

const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");

const cardImageElement = document.querySelector(".card__image");

const cardContentTitleElement = document.querySelector(".card__content-title"); //sub-class of card__content

const newPostImageLinkInput = document.querySelector(
  "#new-post-image-link-input"
);
const newPostImageCaptionInput = document.querySelector(
  "#new-post-caption-input"
);

const newPostForm = newPostModal.querySelector(".modal__form");

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));

newPostBackground.addEventListener("click", () => closeModal(newPostModal));

// function submitNewPostModal(evt) {
//   evt.preventDefault();
//   const cardInputs = {
//     link: newPostImageLinkInput.value,
//     name: newPostImageCaptionInput.value,
//   };
//   const newCard = getCardElement(cardInputs);
//   cardsList.prepend(newCard);
//   evt.target.reset();
//   toggleButtonState(
//     [newPostImageLinkInput, newPostImageCaptionInput],
//     evt.submitter,
//     settings
//   );
//   closeModal(newPostModal);
// }

// newPostForm.addEventListener("submit", submitNewPostModal);
newPostForm.addEventListener("submit", addCard);

let selectedCard;
let selectedCardId;

// primary function
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__content-title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeButton = cardElement.querySelector(
    ".card__content-like-button"
  );

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__content-like-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  // const cardDeleteButton = document.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener(
    "click",
    (evt) => handleDeleteCard(cardElement, data._id)
    // openModal(deleteCardModal)
  );

  cardImageEl.addEventListener("click", () => {
    modalPreviewImage.src = data.link;
    modalPreviewImage.alt = data.name;
    modalPreviewTitle.textContent = data.name;
    openModal(modalPreview);
  });

  // const deleteCardModal = document.querySelector("#delete-card-modal");

  const deleteCardButton = deleteCardModal.querySelector(".modal__delete-btn");

  // deleteCardButton.addEventListener("click", (evt) =>
  //   handleDeleteCard(cardElement, data)
  // );

  return cardElement;

  // not sure why this function needs to be here
  function handleDeleteCard(cardElement, data) {
    openModal(deleteCardModal);
    console.log("Data to delete:", data);
    // Assign the card element to selectedCard
    selectedCard = cardElement;
    // Assign the card's ID to selectedCardId
    // might need to remove "._id"
    selectedCardId = data;
    // open the delete confirmation modal
    // openModal(deleteCardConfirmationModal);
  }
}

// initialCards.forEach((element) => {
//   const cardElem = getCardElement(element);
//   cardsList.append(cardElem);
// });

const modalPreview = document.querySelector("#preview-modal");

const modalPreviewCloseBtn = modalPreview.querySelector(
  ".modal__close-btn_preview"
);

const modalPreviewBackground = modalPreview.querySelector(".modal-background");

const modalPreviewImage = modalPreview.querySelector(".modal__image-preview");

const modalPreviewTitle = modalPreview.querySelector(".modal__preview-title");

modalPreviewCloseBtn.addEventListener("click", () => closeModal(modalPreview));

modalPreviewBackground.addEventListener("click", () =>
  closeModal(modalPreview)
);

// keydown on escape
function escapeKeyDown(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

const listenForEscape = () => {
  document.addEventListener("keydown", escapeKeyDown);
};

const stopListeningForEscape = () => {
  document.removeEventListener("keydown", escapeKeyDown);
};

//edit Avatar avatar modal
const editAvatarModal = document.querySelector("#avatar-edit-modal");

const editAvatarButton = document.querySelector(".avatar__edit-button");

const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");

const editAvatarBackground = editAvatarModal.querySelector(".modal-background");

const newAvatarSaveBtn = editAvatarModal.querySelector(".modal__save-btn");

// const editAvatarUrlInput = document.querySelector("#avatar-url-input");
const editAvatarUrlInput = editAvatarModal.querySelector("#avatar-url-input");

const editAvatarForm = editAvatarModal.querySelector(".modal__form");

const profileAvatarElement = document.querySelector(".profile__avatar");

// const editAvatarDescriptionInput = document.querySelector(
//   "#avatar-description-input"
// );

// const profileNameElement = document.querySelector(".profile__name");

// const profileDescriptionElement = document.querySelector(
//   ".profile__description"
// );

editAvatarButton.addEventListener("click", () => {
  // Use the img `src` value directly for the edit form input
  editAvatarUrlInput.value = profileAvatarElement.src;

  openModal(editAvatarModal);
  resetValidation(editAvatarForm, [editAvatarUrlInput], settings);
});

editAvatarCloseBtn.addEventListener("click", () => closeModal(editAvatarModal));

editAvatarBackground.addEventListener("click", () =>
  closeModal(editAvatarModal)
);

editAvatarForm.addEventListener("submit", submitEditAvatarModal);

// submission function
function submitEditAvatarModal(evt) {
  evt.preventDefault();
  api
    .editUserAvatar({
      avatar: editAvatarUrlInput.value,
    })
    .then((updatedAvatarInfo) => {
      console.log("Updated avatar info:", editAvatarUrlInput.value);
      console.log("The Updated avatar info:", updatedAvatarInfo);
      // update the <img> src so the DOM image updates immediately
      profileAvatarElement.src = updatedAvatarInfo.avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    });
}

// delete card modal
const deleteCardModal = document.querySelector("#delete-card-modal");

const deleteCardButton = deleteCardModal.querySelector(".modal__delete-btn");

const deleteCardCloseBtn = deleteCardModal.querySelector(".modal__close-btn");

const deleteCardCancelBtn = deleteCardModal.querySelector(".modal__cancel-btn");

const deleteCardBackground = deleteCardModal.querySelector(".modal-background");

// deleteCardButton.addEventListener("click", () => {
//   console.log("Delete confirmed");
//   // cardElement.remove();
// });

deleteCardCancelBtn.addEventListener("click", () =>
  closeModal(deleteCardModal)
);

deleteCardCloseBtn.addEventListener("click", () => closeModal(deleteCardModal));

deleteCardBackground.addEventListener("click", () =>
  closeModal(deleteCardModal)
);

const deleteCardConfirmationModal = document.querySelector(
  "#delete-card-confirmation-modal"
);

function handleDeleteSubmit() {
  api
    .deleteCard(selectedCardId) // pass the ID the the api function
    .then(() => {
      // remove the card from the DOM
      selectedCard.remove();
      // close the modal
      closeModal(deleteCardModal);
    })
    .catch(console.error);
}

// deleteCardModal.addEventListener("submit", handleDeleteSubmit);

deleteCardButton.addEventListener("click", handleDeleteSubmit);

// add card modal
// const addCardModal = document.querySelector("#post-new-modal");

// const addCardButton = document.querySelector(".profile__add-button");

// const addCardCloseBtn = addCardModal.querySelector(".modal__close-btn");

// const addCardBackground = addCardModal.querySelector(".modal-background");

// const addCardSaveBtn = addCardModal.querySelector(".modal__save-btn");

// const addCardImageLinkInput = document.querySelector(
//   "#new-post-image-link-input"
// );
// const addCardImageCaptionInput = document.querySelector(
//   "#new-post-caption-input"
// );

// const addCardForm = addCardModal.querySelector(".modal__form");

// addCardButton.addEventListener("click", () => {
//   openModal(addCardModal);
// });

// addCardCloseBtn.addEventListener("click", () => closeModal(addCardModal));

// addCardBackground.addEventListener("click", () => closeModal(addCardModal));

// function submitAddCardModal(evt) {
//   evt.preventDefault();

//   const cardInputs = {
//     link: addCardImageLinkInput.value,
//     name: addCardImageCaptionInput.value,
//   };

//   const newCard = getCardElement(cardInputs);

//   cardsList.prepend(newCard);

//   evt.target.reset();

//   toggleButtonState(
//     [addCardImageLinkInput, addCardImageCaptionInput],
//     evt.submitter,
//     settings
//   );

//   closeModal(addCardModal);
// }

// addCardForm.addEventListener("submit", submitAddCardModal);

function addCard(evt) {
  evt.preventDefault();
  api
    .addNewCard({
      name: newPostImageCaptionInput.value,
      link: newPostImageLinkInput.value,
    })
    .then((data) => {
      console.log("This is the card data", data); // log the received data
      // data.forEach((element) => {
      //   const cardElem = getCardElement(element);
      //   console.log("This is the card element", cardElem);
      //   cardsList.append(cardElem);
      // });
      const newCard = getCardElement(data);
      console.log("This is the card data element", data);
      cardsList.prepend(newCard);
      evt.target.reset();
      toggleButtonState(
        [newPostImageLinkInput, newPostImageCaptionInput],
        evt.submitter,
        settings
      );
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error(err); // log the error if the request fails
    });
}
