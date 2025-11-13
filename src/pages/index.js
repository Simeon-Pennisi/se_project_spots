import "./index.css";

import {
  enableValidation,
  resetValidation,
  settings,
  toggleButtonState,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

/*
  File structure (top -> bottom):
  - imports & api
  - DOM selectors / constants
  - small utilities (open/close modal, escape handling)
  - core functions (getCardElement, addCard, delete handlers)
  - event wiring
  - init (fetch user + cards)
*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "db75981d-07ca-4023-b69b-008231c3f1fd",
    "Content-Type": "application/json",
  },
});

// ===== DOM selectors =====
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Profile / header
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileAvatarElement = document.querySelector(".profile__avatar");

// Edit profile modal
const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileBackground =
  editProfileModal.querySelector(".modal-background");
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__save-btn");

// New post / add card modal
const newPostModal = document.querySelector("#post-new-modal");
const newPostButton = document.querySelector(".profile__add-button");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostBackground = newPostModal.querySelector(".modal-background");
const modalSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostImageLinkInput = document.querySelector(
  "#new-post-image-link-input"
);
const newPostImageCaptionInput = document.querySelector(
  "#new-post-caption-input"
);
const newPostForm = newPostModal.querySelector(".modal__form");

// Preview modal
const modalPreview = document.querySelector("#preview-modal");
const modalPreviewCloseBtn = modalPreview.querySelector(
  ".modal__close-btn_preview"
);
const modalPreviewBackground = modalPreview.querySelector(".modal-background");
const modalPreviewImage = modalPreview.querySelector(".modal__image-preview");
const modalPreviewTitle = modalPreview.querySelector(".modal__preview-title");

// Edit avatar modal
const editAvatarModal = document.querySelector("#avatar-edit-modal");
const editAvatarButton = document.querySelector(".avatar__edit-button");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarBackground = editAvatarModal.querySelector(".modal-background");
const newAvatarSaveBtn = editAvatarModal.querySelector(".modal__save-btn");
const editAvatarUrlInput = editAvatarModal.querySelector("#avatar-url-input");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");

// Delete card modal
const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardButton = deleteCardModal.querySelector(".modal__delete-btn");
const deleteCardCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteCardCancelBtn = deleteCardModal.querySelector(".modal__cancel-btn");
const deleteCardBackground = deleteCardModal.querySelector(".modal-background");

let selectedCard;
let selectedCardId;
let currentUserId = null;

// ===== Utilities =====
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  listenForEscape();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("modal_is-opened");
  stopListeningForEscape();
}

function toggleLikeButton(likeButton) {
  if (likeButton.classList.contains("card__content-like-button_active")) {
    likeButton.classList.remove("card__content-like-button_active");
  } else {
    likeButton.classList.add("card__content-like-button_active");
  }
}

function escapeKeyDown(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

const listenForEscape = () =>
  document.addEventListener("keydown", escapeKeyDown);
const stopListeningForEscape = () =>
  document.removeEventListener("keydown", escapeKeyDown);

// ===== Core: cards =====
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__content-title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(
    ".card__content-like-button"
  );

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardLikeButton.addEventListener("click", () =>
    handleCardLike(cardElement, data._id || data)
  );

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id || data)
  );

  cardImageEl.addEventListener("click", () => {
    modalPreviewImage.src = data.link;
    modalPreviewImage.alt = data.name;
    modalPreviewTitle.textContent = data.name;
    openModal(modalPreview);
  });

  function handleDeleteCard(cardEl, id) {
    selectedCard = cardEl;
    selectedCardId = id;
    openModal(deleteCardModal);
  }

  function handleCardLike(cardEl, id) {
    selectedCard = cardEl;
    selectedCardId = id;
    // check current like state and pass it to toggleCardLike
    const isCurrentlyLiked = cardLikeButton.classList.contains(
      "card__content-like-button_active"
    );
    api
      .toggleCardLike(selectedCardId, isCurrentlyLiked)
      .then(() => {
        cardLikeButton.classList.toggle("card__content-like-button_active");
      })
      .catch(console.error);
  }

  function setInitialLikeState(isLiked) {
    if (isLiked) {
      cardLikeButton.classList.add("card__content-like-button_active");
    } else {
      cardLikeButton.classList.remove("card__content-like-button_active");
    }
  }

  // set initial like state from card data
  const isLiked = data.isLiked || false;
  setInitialLikeState(isLiked);

  return cardElement;
}

// ===== Handlers =====
function submitEditProfileModal(evt) {
  evt.preventDefault();
  editProfileSaveBtn.textContent = "Saving...";
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
    })
    .finally(() => {
      editProfileSaveBtn.textContent = "Save";
    });
}

function submitEditAvatarModal(evt) {
  evt.preventDefault();
  newAvatarSaveBtn.textContent = "Saving...";
  api
    .editUserAvatar({ avatar: editAvatarUrlInput.value })
    .then((updatedAvatarInfo) => {
      profileAvatarElement.src = updatedAvatarInfo.avatar;
      closeModal(editAvatarModal);
    })
    .catch((err) => console.error("Error updating avatar:", err))
    .finally(() => {
      newAvatarSaveBtn.textContent = "Save";
    });
}

function addCard(evt) {
  evt.preventDefault();
  modalSaveBtn.textContent = "Saving...";
  api
    .addNewCard({
      name: newPostImageCaptionInput.value,
      link: newPostImageLinkInput.value,
    })
    .then((data) => {
      const newCard = getCardElement(data);
      cardsList.prepend(newCard);
      evt.target.reset();
      toggleButtonState(
        [newPostImageLinkInput, newPostImageCaptionInput],
        evt.submitter,
        settings
      );
      closeModal(newPostModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      modalSaveBtn.textContent = "Save";
    });
}

function handleDeleteSubmit() {
  deleteCardButton.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteCardButton.textContent = "Delete";
    });
}

// ===== Event wiring =====
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

newPostButton.addEventListener("click", () => openModal(newPostModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));
newPostBackground.addEventListener("click", () => closeModal(newPostModal));
newPostForm.addEventListener("submit", addCard);

modalPreviewCloseBtn.addEventListener("click", () => closeModal(modalPreview));
modalPreviewBackground.addEventListener("click", () =>
  closeModal(modalPreview)
);

editAvatarButton.addEventListener("click", () => {
  editAvatarUrlInput.value = profileAvatarElement.src || "";
  openModal(editAvatarModal);
  resetValidation(editAvatarForm, [editAvatarUrlInput], settings);
});
editAvatarCloseBtn.addEventListener("click", () => closeModal(editAvatarModal));
editAvatarBackground.addEventListener("click", () =>
  closeModal(editAvatarModal)
);
editAvatarForm.addEventListener("submit", submitEditAvatarModal);

deleteCardCancelBtn.addEventListener("click", () =>
  closeModal(deleteCardModal)
);
deleteCardCloseBtn.addEventListener("click", () => closeModal(deleteCardModal));
deleteCardBackground.addEventListener("click", () =>
  closeModal(deleteCardModal)
);
deleteCardButton.addEventListener("click", handleDeleteSubmit);

// ===== Init =====
enableValidation(settings);

function initApp() {
  api
    .getApplicationInfo()
    .then(([cards, userInfo]) => {
      // store current user id for later comparisons (likes)
      currentUserId = userInfo._id;
      // populate profile
      profileAvatarElement.src = userInfo.avatar;
      profileNameElement.textContent = userInfo.name;
      profileDescriptionElement.textContent = userInfo.about;

      // populate cards
      cards.forEach((c) => {
        const el = getCardElement(c);
        cardsList.append(el);
      });
    })
    .catch((err) => console.error("Error fetching application info:", err));
}

initApp();
